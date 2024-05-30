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
import { IAllTask, WorkflowStage } from "@/types";
import { workflowStages } from "@/utils/constants";
import { MoveRight } from "lucide-react";
import { FormEventHandler, useState } from "react";
import { toast } from "sonner";

export function ChangeWorkflowStageDialog({
    taskDetail,
}: {
    taskDetail: IAllTask;
}) {
    const dataContext = useDataContext();
    const [selectedStage, setSelectedStage] = useState(
        taskDetail.workflowStage,
    );
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const handleStageChange = (value: WorkflowStage) => {
        setSelectedStage(value);
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        setLoading(true);
        event.preventDefault();
        event.stopPropagation();
        const response = await taskAPI.ChangeWorkflowStage({
            id: taskDetail._id,
            currentWorkflowStage: taskDetail.workflowStage,
            newWorkflowStage: selectedStage,
        });
        if (response.success) {
            toast.success(response.message);
            dataContext.refreshData({ tasks: true });
            setDialogOpen(false);
        } else if (!response.success) {
            toast.error(response.message);
        }
        setLoading(false);
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <span>
                    <Badge
                        variant={taskDetail.workflowStage}
                        onClick={() => setDialogOpen(true)}
                    >
                        {taskDetail.workflowStage}
                    </Badge>
                </span>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit workflow Stage</DialogTitle>
                    <DialogDescription>
                        Make changes to workflow stage of the task here.
                    </DialogDescription>
                </DialogHeader>
                <form
                    className="flex flex-col gap-5 justify-center w-full"
                    onSubmit={handleSubmit}
                >
                    <div className="flex items-center gap-5 justify-center py-5">
                        <span className="flex gap-1 items-center">
                            <Badge variant={taskDetail.workflowStage}>
                                {taskDetail.workflowStage}
                            </Badge>
                        </span>
                        <MoveRight />
                        <Select
                            value={selectedStage}
                            onValueChange={handleStageChange}
                        >
                            <SelectTrigger className="w-36">
                                <span className="flex justify-center">
                                    <Badge variant={selectedStage}>
                                        {selectedStage}
                                    </Badge>
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select new stage</SelectLabel>
                                    {workflowStages.map((item) => (
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
                    </div>

                    <Button type="submit" className="grow">
                        <LoadingIcon text="Save Changes" isLoading={loading} />
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
