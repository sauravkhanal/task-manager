import { ITaskWithDetails, WorkflowStage } from "@/types";
import { Row } from "@tanstack/react-table";

export type SortingFn<T> = {
    (rowA: Row<T>, rowB: Row<T>, columnId: string): number;
};

type ICustomSortingFunction = {
    [K in keyof ITaskWithDetails]?: SortingFn<ITaskWithDetails>;
};

const customSortingFunctions: ICustomSortingFunction = {
    workflowStage: (rowA, rowB, columnId) => {
        const stages = ["TODO", "INPROGRESS", "TESTING", "COMPLETED"];
        const valueA = rowA.getValue<WorkflowStage>(columnId);
        const valueB = rowB.getValue<WorkflowStage>(columnId);
        if (valueA === valueB) return 0;
        if (stages.indexOf(valueA) < stages.indexOf(valueB)) return -1;
        return 1;
    },
};

export default customSortingFunctions;
