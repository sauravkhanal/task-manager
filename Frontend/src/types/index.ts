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
}