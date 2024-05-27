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
import { priority, tags } from "@/utils/constants";
import { DatePicker } from "../DatePicker";
import { ComboBox } from "../TagsSelector";
import { Button } from "../ui/button";

export default function CreateTask() {
    return (
        <Card className="w-full max-w-3xl">
            <CardHeader>
                <CardTitle>Create Task</CardTitle>
                {/* <CardDescription>Card Description</CardDescription> */}
            </CardHeader>
            <CardContent>
                <form className="flex flex-col gap-5 w-full justify-center">
                    <span className="grid gap-1.5">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            type="text"
                            placeholder="Title for the task"
                        />
                    </span>
                    <span className="flex gap-2">
                        <span className="grid gap-1.5">
                            <Label htmlFor="priority">Task Priority</Label>
                            <SelectItems
                                label="Select Priority"
                                placeholder="Priority"
                                items={priority}
                            />
                        </span>
                        <span className="grid gap-1.5">
                            <Label htmlFor="priority">Deadline</Label>
                            <DatePicker />
                        </span>
                        <span className="grid gap-1.5 grow">
                            <Label htmlFor="tags">Tags</Label>
                            <ComboBox tags={tags} />
                        </span>
                    </span>

                    <span className="grid gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder="Type your description here."
                            id="description"
                            className="min-h-24"
                        />
                    </span>
                </form>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Create Task</Button>
            </CardFooter>
        </Card>
    );
}
