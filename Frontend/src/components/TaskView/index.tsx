import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ITaskWithDetails } from "@/types";
import UserCard from "../CreateTask/SelectUser/UserCard";
import { Badge } from "../ui/badge";
import { TaskDueDate } from "../TaskCard";
import { Calendar, Tag, User } from "lucide-react";
import { useModal } from "@/context/modalContext";
import UpdateTaskButton from "../UpdateTaskButton";
import OpenTaskInNewTabButton from "../OpenTaskInNewTabButton";

export function TaskView({ task }: { task: ITaskWithDetails }) {
    const { hideModal } = useModal();
    return (
        <Card className="w-full max-w-3xl relative font-poppins">
            <CardHeader>
                <CardTitle className="capitalize text-xl flex items-center gap-2">
                    <Badge variant={task.priority}>{task.priority}</Badge>
                    {task.title}

                    <UpdateTaskButton
                        taskDetails={task}
                        variant={"outline"}
                        className="ml-auto"
                    />
                    <OpenTaskInNewTabButton taskID={task._id} />
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5 w-full justify-center">
                {/* assignees */}
                <Card className="rounded-sm">
                    {task.assignees.length > 0 ? (
                        <>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-1">
                                    <User className="size-5" />
                                    Assignees ({task.assignees.length})
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="flex flex-row flex-wrap gap-2 p-1  rounded-sm max-h-28 overflow-y-auto items-center">
                                    {task.assignees.map((value) => (
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                    ))}
                                </div>
                            </CardContent>
                        </>
                    ) : (
                        <CardHeader>No assignees.</CardHeader>
                    )}
                </Card>

                {/* due date */}
                <div className="flex gap-1">
                    <Calendar className="size-5" />
                    <Label htmlFor="" className="self-center">
                        Due :{" "}
                    </Label>
                    <TaskDueDate
                        date={task.dueDate}
                        className="capitalize opacity-80"
                    />{" "}
                    <Badge variant={task.workflowStage}>
                        {task.workflowStage}
                    </Badge>
                </div>

                {/* tags */}
                <Card className=" rounded-sm">
                    {
                        task.tags.length > 0 ? (
                            <CardHeader className="p-4">
                                <CardTitle className="flex flex-wrap gap-1">
                                    <div className="flex gap-1 mr-2">
                                        <Tag className="size-4" />
                                        Tags
                                    </div>
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
                                </CardTitle>
                            </CardHeader>
                        ) : (
                            <CardHeader>No tags.</CardHeader>
                        )
                        //      <CardContent>
                        //     <div className=" flex flex-wrap gap-1">
                        //         {task.tags.map((tag, index) => (
                        //             <Badge
                        //                 key={index}
                        //                 style={{ backgroundColor: tag.color }}
                        //             >
                        //                 {tag.title}
                        //             </Badge>
                        //         ))}
                        //     </div>
                        // </CardContent>
                    }
                </Card>

                <Card className="rounded-sm">
                    {task.description ? (
                        <CardHeader className="p-4">
                            <CardTitle>Description</CardTitle>
                            <CardDescription>
                                {task.description}
                            </CardDescription>
                        </CardHeader>
                    ) : (
                        <CardHeader>Description not provided.</CardHeader>
                    )}
                </Card>

                <Button onClick={() => hideModal()}>Close</Button>
            </CardContent>
        </Card>
    );
}
