import { IActivityDocument } from "@/types";
import { useEffect, useState } from "react";

import taskAPI from "@/api/taskAPI";
import LoadingIcon from "@/components/LoadingIcon";
import GenerateRenderMessage from "./GenerateRenderMessage";

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

    return (
        <LoadingIcon isLoading={loading}>
            <div className="flex flex-col bg-accent p-4 relative w-full">
                {activities.length > 0 ? (
                    <ul className="">
                        {[...activities].reverse().map((activity) => (
                            <li key={activity._id} className="mb-4 text-sm">
                                <GenerateRenderMessage {...activity} />
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
