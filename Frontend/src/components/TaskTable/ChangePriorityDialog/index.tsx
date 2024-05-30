import taskAPI from "@/api/taskAPI";
import LoadingIcon from "@/components/LoadingIcon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import useDataContext from "@/context/dataContext";
import { IAllTask, TaskPriority } from "@/types";
import { priority as priorityData } from "@/utils/constants";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export function ChangePriorityDialog({ taskDetail }: { taskDetail: IAllTask }) {
    const dataContext = useDataContext();
    const [selectedPriority, setSelectedPriority] = useState(
        taskDetail.priority,
    );
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const handlePriorityChange = (value: TaskPriority) => {
        setSelectedPriority(value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        setLoading(true);
        event.preventDefault();
        event.stopPropagation();
        const response = await taskAPI.updateTask({
            id: taskDetail._id,
            taskDetails: {
                priority: selectedPriority,
            },
        });
        if (response.success) {
            toast.success(response.message);
            dataContext.refreshData({ tasks: true });
            setDialogOpen(false);
        } else {
            toast.error(response.message);
        }
        setLoading(false);
    };

    return (
        <Dialog open={dialogOpen}>
            <DialogTrigger asChild>
                <span>
                    <Badge
                        variant={taskDetail.priority}
                        onClick={() => setDialogOpen(true)}
                    >
                        {taskDetail.priority}
                    </Badge>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit priority order</DialogTitle>
                    <DialogDescription>
                        Make changes to priority of the task here. Click save
                        when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="flex flex-col gap-5 justify-center w-full"
                    onSubmit={handleSubmit}
                >
                    <Select
                        value={selectedPriority}
                        onValueChange={handlePriorityChange}
                    >
                        <SelectTrigger className="w-36">
                            <span className="flex justify-center">
                                <Badge variant={selectedPriority}>
                                    {selectedPriority}
                                </Badge>
                            </span>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Change Priority</SelectLabel>
                                {priorityData.map((item) => (
                                    <SelectItem
                                        value={item.title}
                                        key={item.title}
                                    >
                                        <Badge variant={item.title}>
                                            {item.title}
                                        </Badge>
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button type="submit" className="">
                        <LoadingIcon text="Save Changes" isLoading={loading} />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
