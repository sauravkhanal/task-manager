import { Label } from "@/components/ui/label";

import { ITaskWithDetails } from "@/types";

import {
    Calendar,
    MessageCircleMore,
    ReceiptText,
    SquareActivity,
    User,
} from "lucide-react";
import { useParams } from "react-router-dom";
import taskAPI from "@/api/taskAPI";
import { useContext, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import UserCard from "@/components/CreateTask/SelectUser/UserCard";
import { TaskDueDate } from "@/components/TaskCard";
import UpdateTaskButton from "@/components/UpdateTaskButton";
import TaskActivities from "./TaskActivities";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import useDataContext from "@/context/dataContext";
import Comments from "./Comments";
import fullName from "@/utils/fullName";
import { AuthContext } from "@/context/authContext";

export default function TaskView({
    taskDetails,
}: {
    taskDetails?: ITaskWithDetails;
}) {
    const { taskID } = useParams();
    const [task, setTask] = useState<ITaskWithDetails | undefined>(taskDetails);
    const [lengths, setLengths] = useState<{
        activity: number;
        comments: number;
    }>({
        activity: 0,
        comments: 0,
    });
    const { loading } = useDataContext();
    const fetchTask = async (taskID: string) => {
        if (true) {
            const response = await taskAPI.getTask(taskID);
            if (response.success) {
                const task = response.data as ITaskWithDetails;
                setTask(response.data as ITaskWithDetails);
                setLengths({
                    activity: task.activityIDs?.length ?? 0,
                    comments: task.commentIDs?.length ?? 0,
                });
            } else {
                console.log("Couldn't fetch the task: ", response.message);
            }
        }
    };

    const authContext = useContext(AuthContext);
    useEffect(() => {
        if (taskDetails) {
            setLengths({
                activity: taskDetails.activityIDs?.length ?? 0,
                comments: taskDetails.commentIDs?.length ?? 0,
            });
        }
        if (!taskDetails && !loading) fetchTask(taskID!);
    }, [taskID, taskDetails, loading]);

    if (!task) {
        return (
            <p className="text-xl font-foreground h-full flex items-center justify-end text-foreground">
                The given task is not found.
            </p>
        );
    } else
        return (
            <div className="w-full relative font-poppins flex flex-col gap-5 items-center max-w-3xl min-w-2xl bg-background rounded-md shadow-2xl ">
                <div className="w-full capitalize text-xl gap-2 font-semibold px-5 mt-4 flex items-start ml-5 pr-20">
                    <Badge variant={task.priority} className="self-center">
                        {task.priority}
                    </Badge>
                    <p>{task.title}</p>

                    {/* <Button
                        variant="ghost"
                        onClick={() => {
                            alert("clicked");
                            fetchTask();
                        }}
                    >
                        <RefreshCcw size={16} />
                    </Button> */}
                </div>
                {authContext.userDetails?._id === task.creatorID && (
                    <UpdateTaskButton
                        taskDetails={task}
                        variant="ghost"
                        buttonSize={"icon"}
                        className="absolute right-2 top-2"
                    />
                )}
                <ScrollArea className="h-[80svh] w-11/12 border p-4 rounded-sm  shadow-sm mb-6">
                    <div className="flex items-center">
                        <div className=" flex flex-wrap gap-1 grow">
                            {task.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    style={{
                                        backgroundColor: tag.color,
                                    }}
                                    className="text-white"
                                >
                                    #{tag.title}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-5 items-start mt-5">
                        <div>
                            <span className="font-semibold text-sm">
                                Created By:{" "}
                            </span>
                            {fullName(task.creator[0])}
                        </div>
                        <div className="flex items-center gap-1 font-semibold text-sm">
                            Workflow Stage&nbsp;
                            <Badge variant={task.workflowStage}>
                                {task.workflowStage}
                            </Badge>
                        </div>

                        {/* due date */}
                        <div className="flex gap-1 items-center">
                            <Calendar className="size-5" />
                            <Label className="self-center font-semibold">
                                Due :&nbsp;&nbsp;
                            </Label>
                            <TaskDueDate
                                date={task.dueDate}
                                className="capitalize opacity-80 cursor-pointer w-fit"
                            />
                        </div>

                        {/* tags */}
                    </div>
                    <Accordion
                        type="single"
                        collapsible
                        className="mt-5"
                        defaultValue="item-3"
                    >
                        {task.description && (
                            <AccordionItem value="item-3">
                                <AccordionTrigger>
                                    <span className="flex gap-1">
                                        <ReceiptText className="size-5" />
                                        <p className="font-semibold">
                                            Description
                                        </p>
                                    </span>
                                </AccordionTrigger>
                                <AccordionContent className="max-w-2xl px-4 opacity-80 w-full text-justify">
                                    {task.description}
                                </AccordionContent>
                            </AccordionItem>
                        )}

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <span className="flex gap-1">
                                    <User className="size-5" />
                                    <p className="font-semibold">
                                        Assignees ({task.assignees.length})
                                    </p>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                {task.assignees.length > 0 ? (
                                    <div className="flex flex-col gap-2 ">
                                        {(task.assigneeIDs.length ?? 0) > 0 && (
                                            <div className="flex flex-row flex-wrap gap-2 p-1 rounded-sm max-h-28 overflow-y-auto items-center">
                                                {task.assignees.map((value) => (
                                                    <UserCard
                                                        key={value._id}
                                                        firstName={
                                                            value.firstName
                                                        }
                                                        middleName={
                                                            value.middleName
                                                        }
                                                        lastName={
                                                            value.lastName
                                                        }
                                                        profileUrl={
                                                            value.profilePicture
                                                        }
                                                        onRemove={undefined}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p>No assignees added to the task.</p>
                                )}
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                <span className="flex gap-1">
                                    <SquareActivity className="size-5" />
                                    <p className="font-semibold">
                                        Activity Log&nbsp;(
                                        {lengths.activity})
                                    </p>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <TaskActivities
                                    taskID={task._id}
                                    task={task}
                                    setLengths={setLengths}
                                />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>
                                <span className="flex gap-1">
                                    <MessageCircleMore className="size-5" />
                                    <p className="font-semibold">
                                        Comments&nbsp;(
                                        {lengths.comments})
                                    </p>
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Comments task={task} setLengths={setLengths} />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </ScrollArea>
            </div>
        );
}
