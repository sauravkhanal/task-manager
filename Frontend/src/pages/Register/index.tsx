import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { IUserRegisterData } from "@/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Register() {
    const [data, setData] = useState<IUserRegisterData>();
    const inputClass =
        "outline-none rounded-md text-black px-2 py-1 w-56 md:w-96 border-2  focus:border-2 focus:border-secondary-foreground  relative";
    const errorMessage = "text-red-500 text-sm font-light";
    const label = "";
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserRegisterData>();

    const onSubmit: SubmitHandler<IUserRegisterData> = (data) => {
        setData(data);
    };

    return (
        <div className="flex justify-center items-center min-h-[90svh] py-5">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className=" flex flex-col gap-5 justify-center items-center bg-secondary px-10 py-8 rounded-md  max-w-xl shadow-2xl"
            >
                <span className="flex flex-col gap-1">
                    <label htmlFor="firstName" className={label}>
                        First Name
                    </label>
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
                    <label htmlFor="lastName" className={label}>
                        Last Name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        className={` ${inputClass} ${
                            errors?.lastName &&
                            "border-red-500 focus:border-red-500"
                        } md:w-48`}
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
                    <label htmlFor="username" className={label}>
                        Username
                    </label>
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
                    <label htmlFor="email" className={label}>
                        Email
                    </label>
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
                    <label htmlFor="password" className={label}>
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
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
					<label htmlFor="confirmPassword">Confirm Password</label>
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
                <Button className="w-full">Register</Button>
            </form>
        </div>
    );
}
