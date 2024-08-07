import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRoundMinus } from "lucide-react";
import fullName from "@/utils/fullName";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function UserAvatar({
    profileUrl,
    firstName,
    lastName,
    size = 5,
    className,
    hoverContentClassName,
    ...props
}: {
    profileUrl: string;
    firstName: string;
    lastName: string;
    size?: number;
    className?: string;
    hoverContentClassName?: string;
}) {
    return (
        <Avatar className={cn("cursor-pointer", className)} {...props}>
            <AvatarImage
                src={profileUrl}
                width={size}
                height={size}
                className="object-cover"
            />
            <AvatarFallback>
                {firstName.charAt(0)}
                {lastName.charAt(0)}
            </AvatarFallback>
        </Avatar>
    );
}

export default function UserCard({
    profileUrl,
    firstName,
    middleName,
    lastName,
    onRemove,
    size = 5,
}: {
    profileUrl: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    size?: number;
    onRemove?: () => void;
}) {
    const onRemovePresent = onRemove === undefined;
    return (
        <Card className="relative rounded-l-full rounded-r-full grow-0 group shadow-none w-max">
            <div className="flex gap-2 h-10 items-center pr-2">
                <UserAvatar
                    profileUrl={profileUrl}
                    firstName={firstName}
                    lastName={lastName}
                    size={size}
                />
                <p className="font-medium text-sm">
                    {fullName({ firstName, middleName, lastName })}
                </p>
            </div>

            {!onRemovePresent && (
                <Button
                    variant={"destructive"}
                    className="absolute top-0 w-full h-full flex gap-2 items-center justify-center bg-red-500 bg-opacity-75 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150 rounded-full text-sm"
                    onClick={onRemove}
                >
                    Remove
                    <UserRoundMinus className="w-6 h-6" />
                </Button>
            )}
        </Card>
    );
}
