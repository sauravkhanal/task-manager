import React, { useState } from "react";
import {
    DndContext,
    DragEndEvent,
    DragStartEvent,
    DragOverlay,
} from "@dnd-kit/core";
import { IAPIResponse, ITaskWithDetails, WorkflowStage } from "@/types";
import taskAPI from "@/api/taskAPI";
import validateWorkflowStageTransition from "@/utils/validateWorkflowStageTransition";
import { toast } from "sonner";
import Column from "./Column";
import TaskCard from "@/components/TaskCard";

interface IDragAndDropContext {
    tasks: { [key in WorkflowStage]: ITaskWithDetails[] };
    setTasks: React.Dispatch<
        React.SetStateAction<{ [key in WorkflowStage]: ITaskWithDetails[] }>
    >;
}

export default function KanBanBoard({
    tasks,
    setTasks,
}: IDragAndDropContext): React.JSX.Element {
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

        // optimistically update the local state
        const oldState = { ...tasks };

        async function updateLocalState() {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks }; // make a copy

                // check if tasks exist
                const taskIndex = updatedTasks[activeWorkflowStage].findIndex(
                    (task) => task._id === activeId,
                );

                if (taskIndex !== -1) {
                    const taskChanged =
                        updatedTasks[activeWorkflowStage][taskIndex];

                    // remove the updated task
                    updatedTasks[activeWorkflowStage] = updatedTasks[
                        activeWorkflowStage
                    ].filter((task) => task._id !== activeId);

                    // add task to another stage
                    updatedTasks[overWorkflowStage] = [
                        ...updatedTasks[overWorkflowStage],
                        taskChanged,
                    ];

                    // change the workflow stage of task moved
                    taskChanged.workflowStage = overWorkflowStage;
                }

                return updatedTasks;
            });
        }

        //TODO: handle case with network or server error
        // show appropriate message as toast, may use axios interceptor
        async function sendRequestToServer(): Promise<IAPIResponse<any>> {
            try {
                const result = await taskAPI.ChangeWorkflowStage({
                    id: activeId,
                    currentWorkflowStage: activeWorkflowStage,
                    newWorkflowStage: overWorkflowStage,
                });
                return result;
            } catch (error: any) {
                // Handle the error as the response with success: false
                // console.log("error occurred");
                // console.log(error);
                return error;
            }
        }

        const [response, _] = await Promise.all([
            sendRequestToServer(),
            updateLocalState(),
        ]);

        // If request fails, revert to previous state
        if (!response?.success) {
            setTasks(oldState);
            toast.error(response.message || "Internal Server Error");
        } else {
            toast.success(response?.message);
        }

        setActiveTaskCardDetails(null);
    };

    return (
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="h-full w-full grid grid-cols-3 px-5 gap-3 py-2">
                {Object.keys(tasks).map((stage) => (
                    <Column
                        stage={stage as WorkflowStage}
                        tasks={tasks[stage as WorkflowStage]}
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
