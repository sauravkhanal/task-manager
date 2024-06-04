import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "relative inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer uppercase",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
                secondary:
                    "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
                destructive:
                    "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
                outline: "text-foreground",

                LOW: "border-transparent text-white bg-green-500 hover:text-green-500 hover:border-border hover:bg-secondary",
                MED: "border-transparent text-white bg-yellow-500 hover:text-yellow-600 hover:border-border hover:bg-secondary",
                HIGH: "border-transparent text-white bg-red-500 hover:text-red-600 hover:border-border hover:bg-secondary",

                TODO: " text-blue-500   hover:bg-blue-600 hover:text-white",
                INPROGRESS:
                    " text-orange-500  hover:bg-orange-700 hover:text-white",
                TESTING:
                    " text-purple-500  hover:bg-purple-700 hover:text-white",
                COMPLETED: " text-gray-500  hover:bg-gray-600 hover:text-white",
                CUSTOM: "border-transparent text-white hover:opacity-60 ",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    },
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof badgeVariants> {
    notificationCount?: number;
}

function Badge({
    className,
    variant,
    notificationCount,
    children,
    ...props
}: BadgeProps) {
    let notification;
    if (variant === "outline") {
        notification = "bg-background text-black border";
    } else notification = "bg-blue-500 text-white";
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {children}
            {notificationCount && notificationCount > 0 && (
                <span
                    className={`absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs  leading-none ${notification}`}
                >
                    +{notificationCount}
                </span>
            )}
        </div>
    );
}

export { Badge, badgeVariants };
