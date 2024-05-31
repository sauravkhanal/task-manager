export interface IClassName {
    className?: string;
}

export interface IUserLoginData {
    emailOrUsername: string;
    password: string;
}

export interface IUserRegisterData {
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

export interface IAPIResponse<T> {
    success: boolean;
    message: string;
    data: T;
}

export enum IUserRoles {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    USER = "USER",
}

export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    userDetails: IUserDetails;
}

export interface IUserDetails {
    _id: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    email: string;
    emailVerified: boolean;
    role: string;
    deactivated: boolean;
    deleted: boolean;
    profilePicture: string;
}

export interface ITag {
    _id: string;
    authorID?: string;
    taskIDs?: string[];
    title: string;
    description?: string;
    color: string;
    deleted?: boolean;
}

export enum TaskPriority {
    LOW = "LOW",
    MED = "MED",
    HIGH = "HIGH",
}

export enum WorkflowStage {
    TODO = "TODO",
    INPROGRESS = "INPROGRESS",
    TESTING = "TESTING",
    COMPLETED = "COMPLETED",
}

export interface IWorkflowStage {
    _id: string;
    title: WorkflowStage;
    taskIDs: string[];
    description?: string;
}

export interface ITask {
    _id: string;
    title: string;
    description?: string;
    tagIDs: string[];
    dueDate: Date;
    priority: TaskPriority;
    workflowStage: WorkflowStage;
    creatorID: string;
    assigneeIDs: string[];
    commentIDs?: string[];
    attachmentIDs?: string[];
    activityIDs?: string[];
    deleted: boolean;
}

export interface IAllTask extends Omit<ITask, "creatorID" | "assigneeIDs"> {
    creatorID: IUserDetails;
    assigneeIDs: IUserDetails[];
}

// assigned by me

export interface ITasksGroupedByWorkFlowStage {
    workflowStage: WorkflowStage;
    tasks: ITaskWithDetails[];
}

export interface ITaskWithDetails extends ITask {
    creator?: IUserDetails;
    tags: ITag[];
    assignees: IUserDetails[];
}
