import TaskCard from "@/components/TaskCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ITaskWithDetails, WorkflowStage } from "@/types";
import { useDroppable } from "@dnd-kit/core";

function Column({
    stage,
    tasks,
}: {
    stage: WorkflowStage;
    tasks: ITaskWithDetails[];
}) {
    const { isOver, setNodeRef } = useDroppable({
        id: stage,
        data: {
            workflowStage: stage,
        },
    });
    const style = {
        color: isOver ? "green" : undefined,
    };
    return (
        <Card className=" bg-muted " ref={setNodeRef} style={style}>
            <CardHeader>
                <CardTitle className="text-xl flex justify-center gap-2 items-center">
                    {stage} -<p className="text-lg">{tasks.length}</p>
                </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[78svh]">
                <CardContent className="grid gap-2 px-2">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task._id} />
                    ))}
                </CardContent>
            </ScrollArea>
        </Card>
    );
}
export default Column;
