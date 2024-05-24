import { WorkflowStage } from "./types";

export const workflowRules: Record<WorkflowStage, WorkflowStage[]> = {
    [WorkflowStage.TODO]: [WorkflowStage.INPROGRESS],
    [WorkflowStage.INPROGRESS]: [WorkflowStage.TESTING, WorkflowStage.TODO],
    [WorkflowStage.TESTING]: [
        WorkflowStage.COMPLETED,
        WorkflowStage.INPROGRESS,
    ],
    [WorkflowStage.COMPLETED]: [WorkflowStage.TESTING],
};

export default function validateTransition(
    fromStage: WorkflowStage,
    toStage: WorkflowStage,
): boolean {
    const allowedStages = workflowRules[fromStage];
    return allowedStages && allowedStages.includes(toStage);
}
