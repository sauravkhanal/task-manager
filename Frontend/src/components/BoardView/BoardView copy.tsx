import {
    ITaskWithDetails,
    ITasksGroupedByWorkFlowStage,
    WorkflowStage,
} from "@/types";
import { useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard";

export default function BoardView({
    taskGroup,
    loading,
}: {
    taskGroup: ITasksGroupedByWorkFlowStage;
    loading: boolean;
}) {
    const [tasks, setTasks] = useState<{
        [key in WorkflowStage]: ITaskWithDetails[];
    }>({ TODO: [], INPROGRESS: [], COMPLETED: [] });
    useEffect(() => {
        if (!loading) {
            setTasks({
                [WorkflowStage.TODO]: taskGroup["TODO"] || [],
                [WorkflowStage.INPROGRESS]: taskGroup["INPROGRESS"] || [],
                [WorkflowStage.COMPLETED]: taskGroup["COMPLETED"] || [],
            });
        }
    }, [taskGroup, loading]);

    return <KanBanBoard tasks={tasks} setTasks={setTasks} />;
}
