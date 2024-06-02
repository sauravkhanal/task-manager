import {
    DragEndEvent,
    DndContext,
    DragStartEvent,
    DragOverlay,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Column from "./Column";
import useDataContext from "@/context/dataContext";
import { IAPIResponse, ITaskWithDetails, WorkflowStage } from "@/types";
import taskAPI from "@/api/taskAPI";
import validateWorkflowStageTransition from "@/utils/validateWorkflowStageTransition";
import TaskCard from "@/components/TaskCard";

export default function BoardView() {
    const { tasksAssignedToMe, loading } = useDataContext();
    const [activeTaskCardDetails, setActiveTaskCardDetails] =
        useState<ITaskWithDetails | null>(null);
    const [tasks, setTasks] = useState<{ [key: string]: ITaskWithDetails[] }>(
        {},
    );

    useEffect(() => {
        if (!loading) {
            setTasks({
                [WorkflowStage.TODO]: tasksAssignedToMe["TODO"] || [],
                [WorkflowStage.INPROGRESS]:
                    tasksAssignedToMe["INPROGRESS"] || [],
                [WorkflowStage.COMPLETED]: tasksAssignedToMe["COMPLETED"] || [],
            });
        }
    }, [tasksAssignedToMe, loading]);

    async function handleDragStart(event: DragStartEvent) {
        setActiveTaskCardDetails(
            event.active.data.current?.taskDetails as ITaskWithDetails,
        );
        console.log(event.active.data.current?.taskDetails);
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

        // Optimistically update the local state
        const oldState = { ...tasks };

        async function updateLocalState() {
            setTasks((prevTasks) => {
                const updatedTasks = { ...prevTasks }; // make a copy

                // Check if tasks exist
                const taskIndex = updatedTasks[activeWorkflowStage].findIndex(
                    (task) => task._id === activeId,
                );

                if (taskIndex !== -1) {
                    const taskChanged =
                        updatedTasks[activeWorkflowStage][taskIndex];

                    // Remove the updated task
                    updatedTasks[activeWorkflowStage] = updatedTasks[
                        activeWorkflowStage
                    ].filter((task) => task._id !== activeId);

                    // Add task to another stage
                    updatedTasks[overWorkflowStage] = [
                        ...updatedTasks[overWorkflowStage],
                        taskChanged,
                    ];

                    // Change the workflow stage of task moved
                    taskChanged.workflowStage = overWorkflowStage;
                }

                return updatedTasks;
            });
        }

        async function sendRequestToServer(): Promise<IAPIResponse<any>> {
            try {
                const result = await taskAPI.ChangeWorkflowStage({
                    id: activeId,
                    currentWorkflowStage: activeWorkflowStage,
                    newWorkflowStage: overWorkflowStage,
                });
                console.log(result);
                return result;
            } catch (error: any) {
                // Handle the error as the response with success: false
                console.log("error occurred");
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
