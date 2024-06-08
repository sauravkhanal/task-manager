import TaskCard from "@/components/TaskCard";
import { Badge } from "@/components/ui/badge";
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
        <Card
            className="border-none shadow-none bg-muted/40"
            ref={setNodeRef}
            style={style}
        >
            <CardHeader className="p-0">
                <CardTitle className="text- flex justify-center gap-2 items-center border rounded-xl py-2  mb-2  rounded-b-none">
                    {stage}{" "}
                    <Badge className="text-sm" variant={stage}>
                        {tasks.length}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <ScrollArea className="h-[76svh]">
                <CardContent className="grid gap-3 px-3">
                    {tasks.map((task) => (
                        <TaskCard task={task} key={task._id} />
                    ))}
                </CardContent>
            </ScrollArea>
        </Card>
    );
}
export default Column;
