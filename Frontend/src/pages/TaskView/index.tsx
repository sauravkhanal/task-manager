import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ITaskWithDetails } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import UserCard from "@/components/CreateTask/SelectUser/UserCard";
import { TaskDueDate } from "@/components/TaskCard";

export default function TaskView({ task }: { task: ITaskWithDetails }) {
    return (
        <Card className="w-full max-w-3xl relative font-poppins">
            <CardHeader>
                <CardTitle className="capitalize text-xl flex items-center gap-2">
                    <Badge variant={task.priority}>{task.priority}</Badge>
                    {task.title}
                </CardTitle>
                <CardDescription>{task.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5 w-full justify-center">
                    <div className="bg-accent p-2 rounded-sm shadow-md">
                        <Label className="flex items-center gap-1">
                            <User className="size-5" />
                            Assignees ({task.assignees.length})
                        </Label>
                        {task.assignees.length > 0 && (
                            <div className="flex flex-row flex-wrap gap-2 p-1  rounded-sm max-h-28 overflow-y-auto items-center">
                                {task.assignees.map((value) => (
                                    <>
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                        <UserCard
                                            key={value._id}
                                            firstName={value.firstName}
                                            middleName={value.middleName}
                                            lastName={value.lastName}
                                            profileUrl={value.profilePicture}
                                            onRemove={undefined}
                                        />
                                    </>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-1">
                        <Calendar className="size-5" />
                        <Label htmlFor="" className="self-center">
                            Due date:{" "}
                        </Label>
                        <TaskDueDate
                            date={task.dueDate}
                            className="capitalize opacity-80"
                        />
                    </div>
                    <div className="flex flex-col gap-2 bg-accent rounded-sm p-2 shadow-md">
                        <Label>Tags</Label>
                        <div className=" flex flex-wrap gap-1">
                            {task.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    style={{ backgroundColor: tag.color }}
                                >
                                    {tag.title}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
