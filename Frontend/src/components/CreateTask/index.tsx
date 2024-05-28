import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SelectItems } from "../Select";
import { UserDetails, priority, tags } from "@/utils/constants";
import { DatePicker } from "../DatePicker";
import { ComboBox } from "../TagsSelector";
import { Button } from "../ui/button";
import { SelectUser } from "../SelectUser";
// import {
//     TaskFormProvider,
//     useTaskFormContext,
// } from "@/context/createTask.context";
import { ITask, TaskPriority } from "@/types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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

    const onSubmit = (data: ITask) => {
        console.log(data);
        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);
        }
    };

    useEffect(() => {
        register("assigneeIDs");
        register("priority");
        register("dueDate");
        register("tagIDs");
    }, [register]);

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
                            {...register("title")}
                        />
                    </span>
                    <span className="grid gap-1.5">
                        <Label htmlFor="">Add users</Label>
                        <SelectUser
                            prevUsers={[]}
                            availableUsers={UserDetails}
                            setValue={setValue}
                        />
                    </span>
                    <span className="flex gap-2">
                        <span className="grid gap-1.5">
                            <Label htmlFor="priority">Task Priority</Label>
                            <SelectItems
                                label="Select Priority"
                                placeholder="Priority"
                                prevValue={undefined}
                                items={priority}
                                setValue={setValue}
                            />
                        </span>
                        <span className="grid gap-1.5">
                            <Label htmlFor="priority">Deadline</Label>
                            <DatePicker
                                setValue={setValue}
                                getValues={getValues}
                            />
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
