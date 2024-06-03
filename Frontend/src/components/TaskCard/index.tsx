import { ITaskWithDetails } from "@/types";
import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { User, Tags } from "lucide-react";
import cellsUI from "../TaskTable/columns/cellsUI";
import { UserAvatar } from "../CreateTask/SelectUser/UserCard";
import { ChangePriorityDialog } from "../TaskTable/ChangePriorityDialog";

interface TaskCardProps {
    task: ITaskWithDetails;
}

const priorityClasses = {
    HIGH: "border-l-red-500 ",
    MED: "border-l-yellow-500",
    LOW: "border-l-green-500",
};

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
        <div className="relative">
            <Card
                className={cn(
                    `w-full rounded-md border-l-2 relative ${
                        priorityClasses[task.priority]
                    } h-max cursor-grab`,
                )}
                ref={setNodeRef}
                style={style}
                {...listeners}
                {...attributes}
            >
                <CardHeader className="p-4 pr-8">
                    <CardTitle className="flex gap-1 items-center">
                        <UserAvatar
                            profileUrl={task.creator[0].profilePicture}
                            firstName={task.creator[0].firstName}
                            lastName={task.creator[0].lastName}
                            className=""
                        />
                        <p className="line-clamp-1 capitalize">{task.title}</p>
                    </CardTitle>
                    <CardDescription className="line-clamp-2 pt-1">
                        {task.description}
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-row  items-center gap-2 pb-2 pl-2">
                    {/* <UserAvatar
                        profileUrl={task.creator[0].profilePicture}
                        firstName={task.creator[0].firstName}
                        lastName={task.creator[0].lastName}
                        className=""
                    /> */}
                    <ChangePriorityDialog taskDetail={task} />
                    <span className="flex items-end">
                        <User className="size-5 mr-1 self-center" />
                        {cellsUI.assignees(task.assignees)}
                    </span>
                    {task.tags.length > 0 && (
                        <span className="flex gap-1">
                            {/* <Tags /> */}
                            {cellsUI.tags(task.tags)}
                        </span>
                    )}
                    <span className="absolute top-1 right-1">
                        {cellsUI.action(task)}
                    </span>
                </CardContent>
            </Card>
        </div>
    );
};

export default TaskCard;
