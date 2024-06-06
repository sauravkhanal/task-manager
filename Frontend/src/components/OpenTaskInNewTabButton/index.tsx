import { ExternalLink } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import React from "react";

const frontendURL = import.meta.env.VITE_FRONTEND_URL;

interface OpenTaskInNewTabButtonProps {
    taskID: string;
    className?: string;
    variant?: ButtonProps["variant"];
    size?: ButtonProps["size"];
    children?: React.ReactNode;
    iconSize?: number;
}

export default function OpenTaskInNewTabButton({
    taskID,
    className,
    variant = "outline",
    size = "icon",
    iconSize = 5,
    children,
}: OpenTaskInNewTabButtonProps) {
    return (
        <Button
            variant={variant}
            size={size}
            onClick={(e) => {
                e.stopPropagation();
                window.open(`${frontendURL}/details/${taskID}`, "_blank");
            }}
            title="Open in new tab"
            className={`${className}`}
        >
            <ExternalLink
                className={`size-${iconSize} ${children && "mr-2"}`}
            />
            {children}
        </Button>
    );
}
