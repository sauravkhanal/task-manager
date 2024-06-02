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
import { ITaskWithDetails, WorkflowStage } from "@/types";
import { workflowStages as priorityData } from "@/utils/constants";
import { useState } from "react";
import { toast } from "sonner";

export function ChangeWorkflowStageDialog({
    taskDetail,
}: {
    taskDetail: ITaskWithDetails;
}) {
    const dataContext = useDataContext();
    const [selectedPriority, setSelectedPriority] = useState<WorkflowStage>(
        taskDetail.workflowStage,
    );
    // const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handlePriorityChange = async (value: WorkflowStage) => {
        setLoading(true);
        const response = await taskAPI.updateTask({
            id: taskDetail._id,
            taskDetails: {
                workflowStage: value,
            },
        });
        if (response.success) {
            toast.success(response.message);
            dataContext.refreshData({ tasks: true });
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
                <span className="flex justify-center">
                    <Badge variant={selectedPriority}>
                        <LoadingIcon
                            text={selectedPriority}
                            isLoading={loading}
                            color="#ffffff"
                        />
                    </Badge>
                </span>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Change Stage</SelectLabel>
                    {priorityData.map((item) => (
                        <SelectItem value={item.title} key={item.title}>
                            <Badge variant={item.title}>{item.title}</Badge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
