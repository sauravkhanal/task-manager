export interface IClassName {
    className?: string;
}

export interface ILoginForm {
    username?: string;
    email?: string;
    password: string;
}

export interface IRegisterForm {
    firstName: string;
    middleName?: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
