import { Badge, BadgeProps } from "@/components/ui/badge";
import { IActivityDocument } from "@/types";
import { format, formatDistanceToNow } from "date-fns";

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import FormatUsername from "./FormatUsername";

export default function GenerateRenderMessage({
    username,
    action,
    createdAt,
    updatedFields,
    to,
}: IActivityDocument) {
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
                        {<FormatUsername username={username} />} marked the task
                        as&nbsp;
                        <Badge variant={to as BadgeProps["variant"]}>
                            {to}
                        </Badge>
                        &nbsp;
                        {FormatDate(createdAt)}
                    </div>
                );
            } else if (isPriority) {
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
            } else {
                return (
                    <div>
                        {<FormatUsername username={username} />} updated
                        the&nbsp;
                        {updatedFields[0]}&nbsp;
                        {FormatDate(createdAt)}
                    </div>
                );
            }
        } else {
            return (
                <div>
                    {<FormatUsername username={username} />} updated multiple
                    fields
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
            {<FormatUsername username={username} />} performed action {action}
            {FormatDate(createdAt)}
        </div>
    );
}
