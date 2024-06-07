import { useForm, SubmitHandler } from "react-hook-form";
import { ILoginResponse, IUserLoginData } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import userAPI from "@/api/userAPI";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { Label } from "@/components/ui/label";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const inputClass =
        "outline-none rounded-md text-black px-2 py-1 w-56 sm:w-96 border-2 focus:border-2 focus:border-secondary-foreground  relative ";
    const errorMessage = "text-red-500 text-sm font-light w-56 sm:w-96";
    const label = "";
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IUserLoginData>();

    const validateEmailOrUsername = (value: string) => {
        if (value.includes("@")) {
            const isEmailFormat =
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
            if (!isEmailFormat) {
                return "Please enter a valid email.";
            }
        } else {
            const isUsernameFormat = /^[a-zA-Z0-9_-]{5,15}$/.test(value);
            if (!isUsernameFormat) {
                if (value.length < 4)
                    return "Username must have at least 5 characters.";
                return "Username cannot have greater than 15 characters.";
            }
        }
        return true;
    };

    const onSubmit: SubmitHandler<IUserLoginData> = async (data) => {
        const response = await userAPI.login(data);

        toast(response.message.replace(/\n/g, "<br>"));
        if (response.success) {
            login(response.data as ILoginResponse);
            setTimeout(() => navigate("/"), 1500);
        } else {
            for (let key in response.data) {
                setError(
                    key as keyof IUserLoginData,
                    {
                        type: "custom",
                        message:
                            response.data[
                                key as keyof (
                                    | Partial<IUserLoginData>
                                    | ILoginResponse
                                )
                            ],
                    },
                    { shouldFocus: true },
                );
            }
        }
    };

    return (
        <div className=" flex justify-center items-center min-h-[90svh] py-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-5 justify-center items-center bg-secondary px-10 py-8 rounded-md  max-w-xl shadow-2xl"
            >
                <span className="flex flex-col gap-1">
                    <Label htmlFor="emailOrUsername" className={label}>
                        Email or Username
                    </Label>
                    <input
                        id="emailOrUsername"
                        type="text"
                        className={` ${inputClass} ${
                            errors?.emailOrUsername &&
                            "border-red-500 focus:border-red-500"
                        }`}
                        {...register("emailOrUsername", {
                            // required: "Username is required",
                            validate: validateEmailOrUsername,
                        })}
                    />
                    {errors?.emailOrUsername && (
                        <p className={errorMessage}>
                            {errors?.emailOrUsername.message}
                        </p>
                    )}
                </span>

                <span className="flex flex-col gap-1">
                    <label htmlFor="password" className={label}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className={` ${inputClass} ${
                            errors?.password &&
                            "border-red-500 focus:border-red-500"
                        }`}
                        {...register("password", {
                            required: "Password cannot be empty.",
                            minLength: {
                                value: 6,
                                message:
                                    "Password must have at least 6 characters.",
                            },
                            // pattern: {
                            //     value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                            //     message:
                            //         "Password must contain at least one uppercase letter, one symbol, and one number.",
                            // },
                        })}
                    />
                    {errors?.password && (
                        <p className={` ${errorMessage} max-w-96 text-wrap`}>
                            {errors?.password.message}
                        </p>
                    )}
                </span>

                <Link to={"/register"} className="self-end text-sm">
                    <p>
                        Don't have an account?&nbsp;
                        <span className="underline">Register</span>
                    </p>
                </Link>
                <Button
                    className="w-full"
                    disabled={Object.keys(errors).length > 0}
                >
                    Login
                </Button>
            </form>
            <Toaster />
        </div>
    );
}
