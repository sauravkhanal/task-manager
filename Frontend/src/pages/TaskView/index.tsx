import { Label } from "@/components/ui/label";

import { ITaskWithDetails } from "@/types";

import { Calendar, Edit, ReceiptText, RefreshCcw, User } from "lucide-react";
import { useParams } from "react-router-dom";
import taskAPI from "@/api/taskAPI";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/CreateTask/SelectUser/UserCard";
import { TaskDueDate } from "@/components/TaskCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import UpdateTaskButton from "@/components/UpdateTaskButton";

export default function TaskView({
    taskDetails,
}: {
    taskDetails?: ITaskWithDetails;
}) {
    const { taskID } = useParams();
    const [task, setTask] = useState<ITaskWithDetails | undefined>(taskDetails);
    const fetchTask = async () => {
        if (!task || task._id !== taskID) {
            const response = await taskAPI.getTask(taskID!);
            if (response.success) {
                setTask(response.data as ITaskWithDetails);
            } else {
                console.log("Couldn't fetch the task: ", response.message);
            }
        }
    };
    useEffect(() => {
        fetchTask();
    }, [taskID, taskDetails]);

    if (!task) {
        return (
            <p className="text-xl font-foreground h-full flex items-center justify-end text-foreground">
                The given task is not found.
            </p>
        );
    } else
        return (
            <div className="w-full relative font-poppins flex flex-col gap-5 items-center ">
                <p className="w-full capitalize text-xl flex items-center gap-2 bg-accent font-semibold px-5 py-2 justify-center">
                    {task.title}
                    {/* <Button
                        variant="ghost"
                        onClick={() => {
                            alert("clicked");
                            fetchTask();
                        }}
                    >
                        <RefreshCcw size={16} />
                    </Button> */}
                </p>
                <ScrollArea className="h-[80svh] max-w-2xl border p-4 rounded-sm relative shadow-sm">
                    <UpdateTaskButton
                        taskDetails={task}
                        variant="ghost"
                        className="absolute top-1 right-2 bg-background z-10"
                    />
                    <div className="flex flex-col gap-5 items-start">
                        <p className="flex items-center gap-1 font-semibold">
                            Priority&nbsp;
                            <Badge variant={task.priority}>
                                {task.priority}
                            </Badge>
                        </p>
                        <p className="flex items-center gap-1 font-semibold">
                            Workflow Stage&nbsp;
                            <Badge variant={task.workflowStage}>
                                {task.workflowStage}
                            </Badge>
                        </p>

                        {/* assignees */}
                        {task.assignees.length > 0 && (
                            <Card className="flex flex-col gap-2 rounded-sm p-2 shadow-md">
                                <p className="flex items-center gap-1 font-semibold">
                                    <User className="size-5" />
                                    Assignees ({task.assignees.length})
                                </p>
                                {(task.assigneeIDs.length ?? 0) > 0 && (
                                    <div className="flex flex-row flex-wrap gap-2 p-1  rounded-sm max-h-28 overflow-y-auto items-center">
                                        {task.assignees.map((value) => (
                                            <>
                                                <UserCard
                                                    key={value._id}
                                                    firstName={value.firstName}
                                                    middleName={
                                                        value.middleName
                                                    }
                                                    lastName={value.lastName}
                                                    profileUrl={
                                                        value.profilePicture
                                                    }
                                                    onRemove={undefined}
                                                />
                                            </>
                                        ))}
                                    </div>
                                )}
                            </Card>
                        )}

                        {/* due date */}
                        <div className="flex gap-1 items-center">
                            <Calendar className="size-5" />
                            <Label className="self-center font-semibold">
                                Due :&nbsp;&nbsp;
                            </Label>
                            <TaskDueDate
                                date={task.dueDate}
                                className="capitalize opacity-80"
                            />
                        </div>

                        {/* tags */}
                        {task.tagIDs.length > 0 && (
                            <Card className="flex flex-col gap-2 rounded-sm p-2 shadow-md">
                                <p className="font-semibold">Tags</p>
                                <div className=" flex flex-wrap gap-1">
                                    {task.tags.map((tag, index) => (
                                        <Badge
                                            key={index}
                                            style={{
                                                backgroundColor: tag.color,
                                            }}
                                        >
                                            {tag.title}
                                        </Badge>
                                    ))}
                                </div>
                            </Card>
                        )}

                        {/* task description */}
                        {task.description && (
                            <div className="grid gap-2">
                                <span className="flex gap-1">
                                    <ReceiptText className="size-5" />
                                    <p className="font-semibold">Description</p>
                                </span>
                                <p className="max-w-2xl px-4 opacity-80 w-full text-justify">
                                    {task.description}
                                </p>
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </div>
        );
}
