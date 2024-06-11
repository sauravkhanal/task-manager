import userAPI from "@/api/userAPI";
import LoadingIcon from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export default function ResetPassword() {
    const navigator = useNavigate();
    const { resetToken } = useParams();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ newPassword: string }>();

    const [loading, setLoading] = useState<boolean>(false);
    const handleFormSubmit: SubmitHandler<{ newPassword: string }> = async ({
        newPassword,
    }) => {
        try {
            setLoading(true);
            if (resetToken) {
                const response = await userAPI.resetPassword({
                    resetToken,
                    newPassword,
                });
                if (response.success) {
                    toast.success(response.message);
                    navigator("/");
                } else {
                    toast.error(response.message);
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form
            className="flex flex-col justify-center items-center gap-5 w-96"
            onSubmit={handleSubmit(handleFormSubmit)}
        >
            <h1 className="text-xl font-bold">Enter a new strong password</h1>
            <Input
                type="text"
                {...register("newPassword", {
                    required: "Password cannot be empty.",
                    minLength: {
                        value: 6,
                        message: "Password must have at least 6 characters.",
                    },
                    pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).*$/,
                        message:
                            "Password must contain at least one uppercase letter, one symbol, and one number.",
                    },
                })}
            />
            {errors?.newPassword && (
                <p className="text-red-500 text-sm self-start">
                    {errors.newPassword.message}
                </p>
            )}
            <Link to={"/forgot-password"} className="text-sm  self-end">
                <p>
                    Token expired?&nbsp;
                    <span className="underline">Get new</span>
                </p>
            </Link>
            <Button type="submit" className="w-full">
                <LoadingIcon isLoading={loading}>Submit</LoadingIcon>
            </Button>
        </form>
    );
}
