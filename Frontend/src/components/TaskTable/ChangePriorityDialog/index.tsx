import taskAPI from "@/api/taskAPI";
import LoadingIcon from "@/components/LoadingIcon";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select";
import useDataContext from "@/context/dataContext";
import { ITaskWithDetails, TaskPriority } from "@/types";
import { priority as priorityData } from "@/utils/constants";
import { useState } from "react";
import { toast } from "sonner";

export function ChangePriorityDialog({
    taskDetail,
    className,
}: {
    taskDetail: ITaskWithDetails;
    className?: string;
}) {
    const dataContext = useDataContext();
    const [selectedPriority, setSelectedPriority] = useState<TaskPriority>(
        taskDetail.priority,
    );
    // const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePriorityChange = async (value: TaskPriority) => {
        setLoading(true);
        const response = await taskAPI.updateTask({
            id: taskDetail._id,
            taskDetails: {
                priority: value,
            },
        });
        if (response.success) {
            toast.success(response.message);
            dataContext.updateTasksLocally({ ...taskDetail, priority: value });
            setSelectedPriority(value);
            // setDialogOpen(false);
        } else {
            toast.error(response.message);
        }
        setLoading(false);
    };

    return (
        <Select
            value={selectedPriority}
            onValueChange={handlePriorityChange}
            disabled={loading}
            // defaultOpen
        >
            <SelectTrigger minimal={true}>
                <span className={`flex justify-center ${className}`}>
                    <Badge variant={selectedPriority}>
                        <LoadingIcon
                            text={selectedPriority}
                            isLoading={loading}
                            color={
                                priorityData.find(
                                    (item) => item.title === selectedPriority,
                                )?.color
                            }
                        />
                    </Badge>
                </span>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Change Priority</SelectLabel>
                    {Object.keys(TaskPriority).map((item) => (
                        <SelectItem value={item} key={item}>
                            <Badge variant={item as TaskPriority}>{item}</Badge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
