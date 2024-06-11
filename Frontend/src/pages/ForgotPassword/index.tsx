import userAPI from "@/api/userAPI";
import LoadingIcon from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function ForgotPassword() {
    const [usernameOrEmail, setUsernameOrEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    async function handleSubmit() {
        try {
            setLoading(true);
            const response = await userAPI.sendPasswordResetRequest(
                usernameOrEmail,
            );

            if (response.success) {
                toast.success(response.message);
                setUsernameOrEmail("");
            }

            if (!response.success) {
                toast.error(response.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col gap-5  h-full justify-center items-center">
            <h1 className="text-xl font-bold">Enter your email or username</h1>
            <Input
                type="text"
                placeholder="Valid email or username"
                onChange={(event) => setUsernameOrEmail(event.target.value)}
                value={usernameOrEmail}
            />
            <Button onClick={handleSubmit} className="w-full">
                <LoadingIcon isLoading={loading}>Submit</LoadingIcon>
            </Button>
        </div>
    );
}
