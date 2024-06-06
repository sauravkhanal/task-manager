import { ITaskWithDetails } from "@/types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDraggable } from "@dnd-kit/core";
import { User, Calendar } from "lucide-react";
import cellsUI from "../TaskTable/columns/cellsUI";
import { UserAvatar } from "../CreateTask/SelectUser/UserCard";
import { ChangePriorityDialog } from "../TaskTable/ChangePriorityDialog";
import { format, formatDistanceToNow, isBefore } from "date-fns";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useModal } from "@/context/modalContext";
import TaskView from "@/pages/TaskView";

interface TaskCardProps {
    task: ITaskWithDetails;
}

const priorityClasses = {
    HIGH: "border-l-red-500 ",
    MED: "border-l-yellow-500",
    LOW: "border-l-green-500",
};

export const TaskDueDate: React.FC<{ date: Date; className?: string }> = ({
    date,
    className,
}) => {
    const now = new Date();
    // const sevenDaysFromNow = addDays(now, 7);

    // const dueDate = new Date(date);

    // const renderDate = isBefore(dueDate, sevenDaysFromNow)
    //     ? formatDistanceToNow(dueDate, { addSuffix: true })
    //     : format(dueDate, "do LLL ");
    const renderDate = formatDistanceToNow(date, { addSuffix: true });

    const overdue = isBefore(date, now);
    return (
        <HoverCard>
            <HoverCardTrigger>
                <div
                    className={`text-sm text-nowrap ${
                        overdue && "opacity-50"
                    } ${className}`}
                >
                    {renderDate}
                </div>
            </HoverCardTrigger>
            <HoverCardContent className="p-2 text-sm">
                Due date: {format(date, "do LLL hh:mm a")}
            </HoverCardContent>
        </HoverCard>
    );
};
export const TaskTime: React.FC<{ dueDate: Date }> = ({ dueDate }) => {
    return (
        <span className="text-sm text-wrap">{format(dueDate, "hh:mm a")}</span>
    );
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
    const { showModal } = useModal();
    return (
        <Card
            className={cn(
                `w-auto rounded-md relative flex-shrink
                     h-max cursor-grab border-l-2 border-l-red-500
                     ${priorityClasses[task.priority]}`,
            )}
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            onClick={() => showModal(<TaskView taskDetails={task} />)}
        >
            <CardHeader className="p-4 pr-8">
                <CardTitle className="md:flex gap-1 items-center text-base">
                    <ChangePriorityDialog
                        taskDetail={task}
                        className="scale-[0.8]"
                    />
                    <p className="line-clamp-1 capitalize opacity-80">
                        {task.title}
                    </p>
                </CardTitle>
                {/* <CardDescription className="line-clamp-2 pt-1 text-xs">
                        {task.description}
                    </CardDescription> */}
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row flex-wrap relative left-0 gap-4 pb-2 pl-2">
                <div className="hidden lg:flex items-center">
                    <UserAvatar
                        profileUrl={task.creator[0].profilePicture}
                        firstName={task.creator[0].firstName}
                        lastName={task.creator[0].lastName}
                        className="scale-[0.8]"
                    />
                    <p className="text-xs">{task.creator[0].firstName}</p>
                </div>
                <span className="flex gap-1 items-center lg:ml-auto">
                    <Calendar className="size-4" />
                    <TaskDueDate date={task.dueDate} className="text-xs" />
                </span>
                {/* <span className="flex gap-1">
                        <Clock className="size-4" />
                        <TaskTime dueDate={task.dueDate} />
                    </span> */}
                <span className="hidden md:flex items-center">
                    <User className="size-4 mr-1 self-center" />
                    {cellsUI.assignees(task.assignees)}
                </span>
                {/* {task.tags.length > 0 && (
                        <span className="flex gap-1 items-end">
                            <Tags className="size-5" />
                            {cellsUI.tags({
                                tags: task.tags,
                                variant: "outline",
                            })}
                        </span>
                    )} */}
            </CardContent>
            <span className="md:absolute top-1 right-1 ">
                {cellsUI.action(task)}
            </span>
        </Card>
    );
};

export default TaskCard;
