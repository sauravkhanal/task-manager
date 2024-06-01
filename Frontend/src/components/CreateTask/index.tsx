import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectUser } from "./SelectUser";
import { priority } from "@/utils/constants";
import { DatePicker } from "./DatePicker";
import { ComboBox } from "./TagsSelector";
import { Button } from "../ui/button";
import { SelectPriority } from "./SelectPriority";
// import {
//     TaskFormProvider,
//     useTaskFormContext,
// } from "@/context/createTask.context";
import { ITask, TaskPriority } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useDataContext from "@/context/dataContext";
import taskAPI from "@/api/taskAPI";
import { toast } from "sonner";
import { useModal } from "@/context/modalContext";

export default function CreateTask() {
    // const { methods } = useTaskFormContext();
    // const {
    //     register,
    //     handleSubmit,
    //     getValues,
    //     setValue,
    //     formState: { errors },
    // } = methods;
    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        setError,
        reset,

        formState: { errors },
    } = useForm<ITask>({
        defaultValues: {
            title: "",
            description: "",
            priority: TaskPriority.LOW,
            assigneeIDs: [],
            tagIDs: [],
            dueDate: undefined,
        },
    });

    const onSubmit = async (data: ITask) => {
        // for (const [key, value] of Object.entries(data)) {
        //     console.log(`${key}: ${value}`);
        // }
        const response = await taskAPI.CreateTask(data);
        if (response.success) {
            reset();
            toast.success(response.message);
            // setTimeout(() => hideModal(), 1000);
            refreshData({ tasks: true });
            hideModal();
        } else {
            if (response.data.title)
                setError("title", {
                    type: "custom",
                    message: response.data.title,
                });
            else if (response.data.dueDate)
                setError("dueDate", {
                    type: "custom",
                    message: response.data.dueDate.toString(),
                });
            else {
                toast.error(response.message);
            }
        }
    };

    useEffect(() => {
        register("assigneeIDs");
        register("priority");
        register("dueDate");
        register("tagIDs");
    }, [register]);

    const { tags, refreshData } = useDataContext();
    const { hideModal } = useModal();
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Create Task</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <form
                    className="flex flex-col gap-5 w-full justify-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <span className="grid gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Title for the task"
                            className={` ${errors.title && " border-red-600"}`}
                            {...register("title", {
                                required: "Title is required",
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-600 text-sm ">
                                {errors.title.message?.toString()}
                            </p>
                        )}
                    </span>
                    <span className="grid gap-1.5">
                        <Label htmlFor="">Add users</Label>
                        <SelectUser prevUsers={[]} setValue={setValue} />
                    </span>
                    <span className="flex gap-2">
                        <span className="grid gap-1.5">
                            <Label htmlFor="priority">Task Priority</Label>
                            <SelectPriority
                                label="Select Priority"
                                placeholder="Priority"
                                initialValue={undefined}
                                items={priority}
                                setValue={setValue}
                            />
                        </span>
                        <span className="grid gap-1.5">
                            <Label htmlFor="">Deadline</Label>
                            <DatePicker
                                setValue={setValue}
                                getValues={getValues}
                            />
                            {errors.dueDate && (
                                <p className="text-red-600 text-sm ">
                                    {errors.dueDate.message?.toString()}
                                </p>
                            )}
                        </span>
                        <span className="grid gap-1.5 grow">
                            <Label htmlFor="">Tags</Label>
                            <ComboBox
                                availableTags={tags}
                                prevTags={[]}
                                getValues={getValues}
                                setValue={setValue}
                            />
                        </span>
                    </span>

                    <span className="grid gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="Description of the task goes here."
                            id="description"
                            className="min-h-24"
                            {...register("description")}
                        />
                    </span>
                    <Button type="submit">Create Task</Button>
                </form>
            </CardContent>
        </Card>
    );
}
