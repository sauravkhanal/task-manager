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
import { useState } from "react";
import { toast } from "sonner";

export function ChangeWorkflowStageDialog({
    taskDetail,
}: {
    taskDetail: ITaskWithDetails;
}) {
    const dataContext = useDataContext();
    const [selectedWorkflowStage, setSelectedWorkflowStage] =
        useState<WorkflowStage>(taskDetail.workflowStage);
    // const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleWorkflowStageChange = async (value: WorkflowStage) => {
        setLoading(true);
        const response = await taskAPI.updateTask({
            id: taskDetail._id,
            taskDetails: {
                workflowStage: value,
            },
        });
        if (response.success) {
            toast.success(response.message);
            dataContext.updateTasksLocally({
                ...taskDetail,
                workflowStage: value,
            });
            setSelectedWorkflowStage(value);
            // setDialogOpen(false);
        } else {
            toast.error(response.message);
        }
        setLoading(false);
    };

    return (
        <Select
            value={selectedWorkflowStage}
            onValueChange={handleWorkflowStageChange}
            disabled={loading}
            // defaultOpen
        >
            <SelectTrigger minimal={true}>
                <span className="flex justify-center">
                    <Badge variant={selectedWorkflowStage}>
                        <LoadingIcon
                            text={selectedWorkflowStage}
                            isLoading={loading}
                            color="#ffffff"
                        />
                    </Badge>
                </span>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Change Stage</SelectLabel>
                    {Object.keys(WorkflowStage).map((item) => (
                        <SelectItem value={item} key={item}>
                            <Badge variant={item as WorkflowStage}>
                                {item}
                            </Badge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
