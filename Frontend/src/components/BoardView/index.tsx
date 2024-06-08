import {
    ITaskWithDetails,
    ITasksGroupedByWorkFlowStage,
    WorkflowStage,
} from "@/types";
import { useEffect, useState } from "react";
import KanBanBoard from "./KanBanBoard";
import useDataContext from "@/context/dataContext";

export default function BoardView({
    taskGroup,
}: {
    taskGroup: ITasksGroupedByWorkFlowStage;
}) {
    const [tasks, setTasks] = useState<{
        [key in WorkflowStage]: ITaskWithDetails[];
    }>({ TODO: [], INPROGRESS: [], COMPLETED: [] });

    const { loading } = useDataContext();
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
