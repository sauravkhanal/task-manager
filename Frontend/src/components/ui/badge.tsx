import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
    "relative inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
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

                LOW: " text-green-500 cursor-default ",
                MED: " text-yellow-500  cursor-default",
                HIGH: " text-red-500  cursor-default",

                TODO: "border-transparent bg-blue-500  text-white hover:bg-blue-600",
                INPROGRESS:
                    "border-transparent bg-orange-500 text-white hover:bg-orange-700",
                TESTING:
                    "border-transparent bg-purple-500 text-white hover:bg-purple-700",
                COMPLETED:
                    "border-transparent bg-gray-500 text-white hover:bg-gray-600",
                custom: "border-transparent text-white hover:opacity-60",
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
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props}>
            {children}
            {notificationCount && notificationCount > 0 && (
                <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 inline-flex items-center justify-center px-1.5 py-0.5 rounded-full text-xs font-bold leading-none bg-red-500 text-white cursor-">
                    +{notificationCount}
                </span>
            )}
        </div>
    );
}

export { Badge, badgeVariants };
