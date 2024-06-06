import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DataTable from "../TaskTable";
import { ITaskWithDetails, ITasksGroupedByWorkFlowStage } from "@/types";
import BoardView from "@/BoardView";

export default function TaskViewToggleGroup({
    tasks,
    tasksGroupedByWorkFlowStages,
}: {
    tasks?: ITaskWithDetails[];
    tasksGroupedByWorkFlowStages: ITasksGroupedByWorkFlowStage;
}) {
    function mergeTasks(taskGroup: ITasksGroupedByWorkFlowStage): any {
        const tasks: ITaskWithDetails[] = [];
        Object.keys(taskGroup).forEach((stage) => {
            tasks.push(
                ...taskGroup[stage as keyof ITasksGroupedByWorkFlowStage],
            );
        });
        return tasks;
    }

    return (
        <Tabs
            defaultValue="boardView"
            className="h-full  w-full flex flex-col items-center"
        >
            <TabsList className="flex justify-center w-fit mt-2">
                <TabsTrigger value="tableView">Table</TabsTrigger>
                <TabsTrigger value="boardView">KanBan Board</TabsTrigger>
                <TabsTrigger value="tableView">Table</TabsTrigger>
            </TabsList>
            <TabsContent
                value="tableView"
                className="w-full flex justify-center m-0"
            >
                <DataTable
                    data={
                        tasks ? tasks : mergeTasks(tasksGroupedByWorkFlowStages)
                    }
                />
            </TabsContent>
            <TabsContent value="boardView" className="w-full grow">
                <BoardView taskGroup={tasksGroupedByWorkFlowStages} />
            </TabsContent>
        </Tabs>
    );
}
