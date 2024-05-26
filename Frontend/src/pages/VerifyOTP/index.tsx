import userAPI from "@/api/userAPI";
import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function VerifyOTP() {
    const navigate = useNavigate();
    const [value, setValue] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    async function submitHandler(): Promise<void> {
        setLoading(true);
        const result = await userAPI.verifyOTP(value!);
        toast(result.message);
        if (result.success) {
            navigate("/dashboard");
        }
        setLoading(false);
    }
    return (
        <div className="flex flex-col flex-grow justify-center items-center gap-5">
            <div className="text-xl font-semibold">
                Please enter the code sent to your email
            </div>
            <InputOTP
                maxLength={6}
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={(val) => setValue(val)}
            >
                <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                </InputOTPGroup>
            </InputOTP>
            <Button onClick={submitHandler} disabled={loading}>
                {!loading ? "submit" : "Loading"}
            </Button>
        </div>
    );
}
