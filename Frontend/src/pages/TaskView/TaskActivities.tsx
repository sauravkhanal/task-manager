import { Badge, BadgeProps } from "@/components/ui/badge";
import { IActivityDocument } from "@/types";
import { format, formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import FormatUsername from "./FormatUsername";
import taskAPI from "@/api/taskAPI";
import LoadingIcon from "@/components/LoadingIcon";

export default function TaskActivities({
    taskID,
    setLengths,
}: {
    taskID: string;
    setLengths: React.Dispatch<
        React.SetStateAction<{
            activity: number;
            comments: number;
        }>
    >;
}) {
    const [activities, setActivities] = useState<IActivityDocument[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    async function fetchDetails() {
        setLoading(true);
        try {
            const response = await taskAPI.getAllActivities(taskID);
            if (response.success) {
                const activities = response.data as IActivityDocument[];
                setActivities(activities);
                setLengths((prev) => {
                    return { ...prev, activity: activities.length };
                });
            } else {
                console.error("Failed to fetch activities", response.message);
            }
        } catch (error) {
            console.error("Error fetching activities:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDetails();
    }, [taskID]);

    function FormatDate(date: string) {
        const renderDate = formatDistanceToNow(date, { addSuffix: true });
        return (
            <HoverCard>
                <HoverCardTrigger className="font-semibold cursor-pointer">
                    &nbsp;{renderDate}.
                </HoverCardTrigger>
                <HoverCardContent className="p-2 w-fit">
                    &nbsp;
                    {format(date, "do LLL yyyy, hh:mm a")}
                </HoverCardContent>
            </HoverCard>
        );
    }

    const renderActivityMessage = ({
        username,
        action,
        createdAt,
        updatedFields,
        to,
    }: IActivityDocument) => {
        if (action === "created") {
            return (
                <div>
                    {<FormatUsername username={username} />} created the task
                    {FormatDate(createdAt)}
                </div>
            );
        }

        if (updatedFields) {
            const isWorkflowStage = updatedFields.includes("workflowStage");
            const isPriority = updatedFields.includes("priority");

            if (updatedFields.length === 1) {
                if (isWorkflowStage) {
                    return (
                        <div>
                            {<FormatUsername username={username} />} marked the
                            task as&nbsp;
                            <Badge variant={to as BadgeProps["variant"]}>
                                {to}
                            </Badge>
                            &nbsp;
                            {FormatDate(createdAt)}
                        </div>
                    );
                }
                if (isPriority) {
                    return (
                        <div>
                            {<FormatUsername username={username} />} changed the
                            priority to &nbsp;
                            <Badge variant={to as BadgeProps["variant"]}>
                                {to}
                            </Badge>
                            &nbsp;
                            {FormatDate(createdAt)}
                        </div>
                    );
                }
            } else {
                return (
                    <div>
                        {<FormatUsername username={username} />} updated
                        multiple fields
                        {FormatDate(createdAt)}
                        <div className="capitalize text-xs">
                            Fields updated: {updatedFields.join(", ")}
                        </div>
                    </div>
                );
            }
        }

        return (
            <div>
                {<FormatUsername username={username} />} performed action{" "}
                {action}
                {FormatDate(createdAt)}
            </div>
        );
    };

    return (
        <LoadingIcon isLoading={loading}>
            <div className="flex flex-col bg-accent p-4 relative w-full">
                {activities.length > 0 ? (
                    <ul className="">
                        {[...activities].reverse().map((activity) => (
                            <li key={activity._id} className="mb-4 text-sm">
                                {renderActivityMessage(activity)}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No activities found</div>
                )}
            </div>
        </LoadingIcon>
    );
}
