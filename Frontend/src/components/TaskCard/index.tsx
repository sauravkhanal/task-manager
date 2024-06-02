import { ITaskWithDetails } from "@/types";
import React from "react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
interface TaskCardProps {
    task: ITaskWithDetails;
}

const priorityClasses = {
    HIGH: "border-l-red-500 ",
    MED: "border-l-yellow-500",
    LOW: "border-l-green-500",
};

import { useDraggable } from "@dnd-kit/core";

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task._id,
        data: {
            taskId: task._id,
            workflowStage: task.workflowStage,
            taskDetails: task,
        },
    });
    const style = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : undefined;
    return (
        <Card
            className={cn(
                `w-full rounded-md border-l-2  relative ${
                    priorityClasses[task.priority]
                } h-max cursor-grab`,
            )}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
        >
            <CardHeader>
                <CardTitle className=" line-clamp-1 capitalize items-center">
                    {task.title}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                    {task.description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default TaskCard;
