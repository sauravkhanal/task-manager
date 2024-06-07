import { useForm, SubmitHandler } from "react-hook-form";
import { IUserRegisterData } from "@/types";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import userAPI from "@/api/userAPI";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function Register() {
    const navigate = useNavigate();
    const inputClass =
        "outline-none rounded-md text-black px-2 py-1 w-56 sm:w-96 border-2 focus:border-2 focus:border-secondary-foreground  relative ";
    const errorMessage = "text-red-500 text-sm font-light w-56 sm:w-96";
    const label = "";
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<IUserRegisterData>();

    const onSubmit: SubmitHandler<IUserRegisterData> = async (data) => {
        const response = await userAPI.createUser(data);

        if (response.success) {
            toast(response.message.replace(/\n/g, "<br>"));
            setTimeout(() => navigate("/verify"), 1500);
        } else {
            toast(`${Object.keys(response.data).toString()} is already used`);
            for (let key in response.data) {
                setError(
                    key as keyof IUserRegisterData,
                    {
                        type: "custom",
                        message: response.data[key as keyof IUserRegisterData],
                    },
                    { shouldFocus: true },
                );
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[90svh] py-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5 justify-center items-center bg-secondary px-10 py-8 rounded-md  max-w-xl shadow-2xl"
            >
                <span className="flex flex-col gap-1">
                    <Label htmlFor="firstName" className={label}>
                        First Name
                    </Label>
                    <input
                        id="firstName"
                        type="text"
                        className={` ${inputClass}  ${
                            errors?.firstName &&
                            "border-red-500 focus:border-red-500"
                        } `}
                        {...register("firstName", {
                            required: "First name is required",
                        })}
                    />
                    {errors?.firstName && (
                        <p className={errorMessage}>
                            {errors?.firstName.message}
                        </p>
                    )}
                </span>

                <span className="flex flex-col gap-1">
                    <Label htmlFor="lastName" className={label}>
                        Last Name
                    </Label>
                    <input
                        id="lastName"
                        type="text"
                        className={` ${inputClass} ${
                            errors?.lastName &&
                            "border-red-500 focus:border-red-500"
                        }`}
                        {...register("lastName", {
                            required: "Last name is required",
                        })}
                    />
                    {errors?.lastName && (
                        <p className={errorMessage}>
                            {errors?.lastName.message}
                        </p>
                    )}
                </span>
                <span className="flex flex-col gap-1">
                    <Label htmlFor="username" className={label}>
                        Username
                    </Label>
                    <input
                        id="username"
                        type="text"
                        className={` ${inputClass} ${
                            errors?.username &&
                            "border-red-500 focus:border-red-500"
                        }`}
                        {...register("username", {
                            required: "Username is required",
                            maxLength: {
                                value: 15,
                                message:
                                    "Username can have a maximum of 15 characters.",
                            },
                            minLength: {
                                value: 5,
                                message:
                                    "Username must have at least 5 characters.",
                            },
                        })}
                    />
                    {errors?.username && (
                        <p className={errorMessage}>
                            {errors?.username.message}
                        </p>
                    )}
                </span>

                <span className="flex flex-col gap-1">
                    <Label htmlFor="email" className={label}>
                        Email
                    </Label>
                    <input
                        id="email"
                        type="email"
                        className={` ${inputClass} ${
                            errors?.email &&
                            "border-red-500 focus:border-red-500"
                        }`}
                        {...register("email", {
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "This email format is not supported.",
                            },
                        })}
                    />
                    {errors?.email && (
                        <p className={errorMessage}>{errors?.email.message}</p>
                    )}
                </span>

                <span className="flex flex-col gap-1">
                    <Label htmlFor="password" className={label}>
                        Password
                    </Label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="false"
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
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                                message:
                                    "Password must contain at least one uppercase letter, one symbol, and one number.",
                            },
                        })}
                    />
                    {errors?.password && (
                        <p className={` ${errorMessage} max-w-96 text-wrap`}>
                            {errors?.password.message}
                        </p>
                    )}
                </span>

                {/* <span className="flex flex-col gap-1">
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<input
						id="confirmPassword"
						type="password"
						className={` ${inputClass} ${
							errors?.confirmPassword &&
							"border-red-500 focus:border-red-500"
						}`}
						{...register("confirmPassword", {
							required: "Please confirm your password.",
							validate: (value) =>
								value === watch("password") ||
								"Passwords do not match",
						})}
					/>
					{errors?.confirmPassword && (
						<p className={errorMessage}>
							{errors?.confirmPassword.message}
						</p>
					)}
				</span> */}
                <Link to={"/login"} className="self-end text-sm">
                    <p>
                        Already have an account?&nbsp;
                        <span className="underline">Login</span>
                    </p>
                </Link>
                <Button
                    className="w-full"
                    disabled={Object.keys(errors).length > 0}
                >
                    Register
                </Button>
            </form>
            <Toaster />
        </div>
    );
}
