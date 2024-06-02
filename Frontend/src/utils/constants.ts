import {
    ITaskWithDetails,
    IWorkflowStage,
    TaskPriority,
    WorkflowStage,
} from "@/types";

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

export const dummyTask: ITaskWithDetails = {
    _id: "6656c69e38301d3871d53e87",
    title: "This is task one",
    description: "this is Description of task one",
    tagIDs: ["6656c8038665842c4ced5bbb", "6656c80d8665842c4ced5bc2"],
    dueDate: new Date("2024-05-30T18:15:00.000Z"),
    priority: TaskPriority.MED,
    workflowStage: WorkflowStage.INPROGRESS,
    tags: [
        {
            _id: "6656c80d8665842c4ced5bc2",
            authorID: "665369257b1fb6f1eddafa1c",
            taskIDs: [],
            title: "backend",
            description: "",
            color: "#a35700",
            deleted: false,
        },
        {
            _id: "6656c8038665842c4ced5bbb",
            authorID: "665369257b1fb6f1eddafa1c",
            taskIDs: [],
            title: "frontend",
            description: "",
            color: "#9010f9",
            deleted: false,
        },
    ],
    creatorID: "665369257b1fb6f1eddafa1c",
    assigneeIDs: [
        "66562c9b27fbf48612b28e3f",
        "66562d0427fbf48612b28e4d",
        "665369257b1fb6f1eddafa1c",
    ],
    creator: {
        _id: "665369257b1fb6f1eddafa1c",
        firstName: "Saurav",
        lastName: "Khanal",
        username: "saurav",
        email: "sauravkhanal635@gmail.com",
        profilePicture: "",
        emailVerified: true,
        role: "ADMIN",
        deleted: false,
        deactivated: false,
    },
    assignees: [
        {
            _id: "66562c9b27fbf48612b28e3f",
            firstName: "Tom",
            lastName: "Cat",
            username: "tommyboy",
            email: "hetox87307@adrais.com",
            profilePicture:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE5q5VQK_nZixrGZWMzfbZnGRVcgAlUVoayyIfIfLd5w&s",
            emailVerified: true,
            role: "USER",
            deleted: false,
            deactivated: false,
        },
        {
            _id: "66562d0427fbf48612b28e4d",
            firstName: "jerry",
            lastName: "mouse",
            username: "jerrydon",
            email: "losifo4220@fresec.com",
            profilePicture:
                "https://cdn.hanna-barberawiki.com/thumb/5/52/T%26JS_1975_Jerry.png/300px-T%26JS_1975_Jerry.png",
            emailVerified: false,
            role: "USER",
            deleted: false,
            deactivated: false,
        },
        {
            _id: "665369257b1fb6f1eddafa1c",
            firstName: "Saurav",
            lastName: "Khanal",
            username: "saurav",
            email: "sauravkhanal635@gmail.com",
            profilePicture: "",
            emailVerified: true,
            role: "ADMIN",
            deleted: false,
            deactivated: false,
        },
    ],

    commentIDs: [],
    attachmentIDs: [],
    activityIDs: [],
    deleted: false,
    createdAt: "2024-05-29T06:09:34.615Z",
    updatedAt: "2024-06-03T03:41:45.450Z",
    __v: 0,
};
