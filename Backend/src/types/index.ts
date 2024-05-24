import { UserRoles } from "../routes/v1/users/types";

export interface IAccessToken {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    role: UserRoles;
}
