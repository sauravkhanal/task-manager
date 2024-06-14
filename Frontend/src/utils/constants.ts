import { IWorkflowStage, TaskPriority, WorkflowStage } from "@/types";

export const priority: { title: TaskPriority; _id: string; color: string }[] = [
    {
        title: TaskPriority.LOW,
        _id: "LOW_ID",
        color: "#016e2d",
    },
    {
        title: TaskPriority.MED,
        color: "#FFD700",
        _id: "MED_ID",
    },
    {
        title: TaskPriority.HIGH,
        color: "#fa1302",
        _id: "HIGH_ID",
    },
];

export const tags = [
    {
        _id: "backlog",
        title: "Backlog",
        color: "#f3a683",
    },
    {
        _id: "todo",
        title: "Todo",
        color: "#f7d794",
    },
    {
        _id: "in progress",
        title: "In Progress",
        color: "#778beb",
    },
    {
        _id: "done",
        title: "Done",
        color: "#e77f67",
    },
    {
        _id: "canceled",
        title: "Canceled",
        color: "#cf6a87",
    },
];

export const workflowStages: IWorkflowStage[] = [
    {
        _id: "one",
        taskIDs: [],
        title: WorkflowStage.TODO,
        description: "This is the description of the todo phase.",
    },
    {
        _id: "two",
        taskIDs: [],
        title: WorkflowStage.INPROGRESS,
        description: "This is the description of the inprogress phase.",
    },
    // {
    //     _id: "three",
    //     taskIDs: [],
    //     title: WorkflowStage.TESTING,
    //     description: "This is the description of the testing phase.",
    // },
    {
        _id: "four",
        taskIDs: [],
        title: WorkflowStage.COMPLETED,
        description: "This is the description of the completed phase.",
    },
];
