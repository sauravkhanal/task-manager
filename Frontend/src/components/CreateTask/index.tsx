import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { priority } from "@/utils/constants";
import { Button } from "../ui/button";
import { ITaskWithDetails, TaskPriority } from "@/types";
import { useForm } from "react-hook-form";
import useDataContext from "@/context/dataContext";
import taskAPI from "@/api/taskAPI";
import { toast } from "sonner";
import { useModal } from "@/context/modalContext";
import { SelectUser } from "../CreateTask/SelectUser";
import { SelectPriority } from "../CreateTask/SelectPriority";
import { DatePicker } from "../CreateTask/DatePicker";
import TagsSelector from "./TagsSelector";
import { useState } from "react";
import LoadingIcon from "../LoadingIcon";

export default function TaskForm({
    task,
    mode,
}: {
    task?: ITaskWithDetails;
    mode: "create" | "update";
}) {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
        setError,
        reset,
    } = useForm<ITaskWithDetails>();

    const onSubmit = async (data: ITaskWithDetails) => {
        if (mode === "update") {
            await submit.updateTask(data);
        } else {
            await submit.createTask(data);
        }
    };

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const submit = {
        createTask: async (data: ITaskWithDetails) => {
            setIsLoading(true);
            const response = await taskAPI.CreateTask(data);
            if (response.success) {
                toast.success(response.message);
                resetForm();
                refreshData({
                    tasks: true,
                    tasksAssignedByMe: true,
                    tasksAssignedToMe: true,
                });
                hideModal();
            } else {
                handleErrors(response);
            }
            setIsLoading(false);
        },

        updateTask: async (data: ITaskWithDetails) => {
            setIsLoading(true);
            const response = await taskAPI.updateTask({
                id: task?._id ?? "",
                taskDetails: data,
            });
            if (response.success) {
                toast.success(response.message);
                resetForm();
                refreshData({
                    tasks: true,
                    tasksAssignedByMe: true,
                    tasksAssignedToMe: true,
                });
                hideModal();
            } else {
                toast.error(response.message);
            }
            setIsLoading(false);
        },
    };

    const handleErrors = (response: any) => {
        if (response.data.title) {
            setError("title", {
                type: "custom",
                message: response.data.title,
            });
        } else if (response.data.dueDate) {
            setError("dueDate", {
                type: "custom",
                message: "Due date is required.",
            });
        } else {
            toast.error(response.message);
        }
    };

    const { tags, refreshData } = useDataContext();
    const { hideModal } = useModal();

    const resetForm = () => {
        reset({
            title: "",
            description: "",
            priority: TaskPriority.LOW,
            assigneeIDs: [],
            tagIDs: [],
            dueDate: new Date(),
        });
    };

    return (
        <Card className="w-full max-w-3xl font-poppins">
            <CardHeader>
                <CardTitle>
                    {mode === "create" ? "Create Task" : "Task Details"}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-5 w-full justify-center"
                >
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Title for the task"
                            defaultValue={task?.title}
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-600 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Label htmlFor="">Add users</Label>
                        <SelectUser
                            prevUsers={task?.assignees || []}
                            setValue={setValue}
                        />
                    </div>

                    <div className="flex gap-2 items-end">
                        <div className="">
                            <Label htmlFor="priority">Task Priority</Label>
                            <SelectPriority
                                label="Select Priority"
                                placeholder="Priority"
                                items={priority}
                                setValue={setValue}
                                prevValue={task?.priority}
                            />
                        </div>
                        <div className="grid gap-1">
                            <Label htmlFor="">Deadline</Label>
                            <DatePicker
                                setValue={setValue}
                                prevValue={task?.dueDate}
                            />
                        </div>
                        <div className="flex-1">
                            <Label htmlFor="">Tags</Label>
                            <TagsSelector
                                availableTags={tags}
                                prevTags={task?.tags || []}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description of the task goes here."
                            defaultValue={task?.description}
                            {...register("description")}
                        />
                    </div>

                    <Button type="submit" disabled={isLoading}>
                        <LoadingIcon isLoading={isLoading}>
                            {mode === "update" ? "Update Task" : "Create Task"}
                        </LoadingIcon>
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
