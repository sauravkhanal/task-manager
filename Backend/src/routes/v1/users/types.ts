import mongoose from "mongoose";

export interface IUser {
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    profilePicture?: string;
    emailVerified: boolean;
    role?: string;
    deleted?: boolean;
    deactivated?: boolean;
    preferencesID: mongoose.Types.ObjectId;
}

export enum UserRoles {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    USER = "USER",
}

export const fieldsFromUserToOmit: (keyof IUser)[] = ["password"];
