import { IAllTask, WorkflowStage } from "@/types";
import { Row } from "@tanstack/react-table";

export type SortingFn<T> = {
    (rowA: Row<T>, rowB: Row<T>, columnId: string): number;
};

type ICustomSortingFunction = {
    [K in keyof IAllTask]?: SortingFn<IAllTask>;
};

const customSortingFunctions: ICustomSortingFunction = {
    workflowStage: (rowA, rowB, columnId) => {
        const stages = ["TODO", "INPROGRESS", "TESTING", "COMPLETED"];
        const valueA = rowA.getValue<WorkflowStage>(columnId);
        const valueB = rowB.getValue<WorkflowStage>(columnId);
        console.log(valueA);
        console.log(valueB);
        if (valueA === valueB) return 0;
        if (stages.indexOf(valueA) < stages.indexOf(valueB)) return -1;
        return 1;
    },
};

export default customSortingFunctions;
