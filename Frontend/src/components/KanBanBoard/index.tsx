import React, { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
    useSensor,
    PointerSensor,
} from "@dnd-kit/core";
import { ITaskWithDetails, WorkflowStage } from "@/types";
import taskAPI from "@/api/taskAPI";
import validateWorkflowStageTransition from "@/utils/validateWorkflowStageTransition";
import { toast } from "sonner";
import Column from "./Column";
import TaskCard from "@/components/TaskCard";
import useDataContext from "@/context/dataContext";

interface IDragAndDropContext {
    tasks: { [key in WorkflowStage]: ITaskWithDetails[] };
}

const useCustomPointerSensor = (activationConstraint: number) => {
    const sensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: activationConstraint,
        },
    });

    return sensor;
};

export default function KanBanBoard({
    tasks,
}: IDragAndDropContext): React.JSX.Element {
    const dataContext = useDataContext();
    const [activeTaskCardDetails, setActiveTaskCardDetails] =
        useState<ITaskWithDetails | null>(null);

    async function handleDragStart(event: DragStartEvent) {
        setActiveTaskCardDetails(
            event.active.data.current?.taskDetails as ITaskWithDetails,
        );
    }
    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over) return;

        const activeId = active.id as string;
        const activeWorkflowStage = active.data.current
            ?.workflowStage as WorkflowStage;
        const overWorkflowStage = over.data.current
            ?.workflowStage as WorkflowStage;

        if (activeWorkflowStage === overWorkflowStage) return;

        if (
            !validateWorkflowStageTransition(
                activeWorkflowStage,
                overWorkflowStage,
            )
        ) {
            toast.error(
                `Cannot move task from ${activeWorkflowStage} to ${overWorkflowStage}`,
            );
            return;
        }

        dataContext.updateTasksLocally({
            ...activeTaskCardDetails!,
            workflowStage: overWorkflowStage,
        });

        const sonnerPromise = async () => {
            const response = await taskAPI.ChangeWorkflowStage({
                id: activeId,
                currentWorkflowStage: activeWorkflowStage,
                newWorkflowStage: overWorkflowStage,
            });

            if (response.success) {
                return response;
            } else {
                dataContext.revertTaskChanges();
                throw Error(response.message);
            }
        };

        toast.promise(sonnerPromise, {
            loading: "Validating transition...",
            success: (data) => {
                return data.message;
            },
            error: (error) => {
                return error.message;
            },
        });

        setActiveTaskCardDetails(null);
    };

    const pointerSensor = useCustomPointerSensor(10);
    return (
        <DndContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
            sensors={[pointerSensor]}
        >
            <div className="h-full w-full grid grid-cols-3 px-5 gap-5">
                {Object.keys(WorkflowStage).map((stage) => (
                    <Column
                        stage={stage as WorkflowStage}
                        tasks={tasks[stage as WorkflowStage] || []}
                        key={stage}
                    />
                ))}
            </div>
            <DragOverlay>
                {activeTaskCardDetails ? (
                    <TaskCard task={activeTaskCardDetails} />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
