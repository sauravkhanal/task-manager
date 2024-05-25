export interface IClassName {
    className?: string;
}

export interface IUserLoginData {
    username?: string;
    email?: string;
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
