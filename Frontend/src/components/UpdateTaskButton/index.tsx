import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useModal } from "@/context/modalContext";
import TaskForm from "@/components/CreateTask";
import { ITaskWithDetails } from "@/types";

interface UpdateTaskProps {
    taskDetails: ITaskWithDetails;
    variant?: ButtonProps["variant"];
    className?: string;
    iconClassName?: string;
    children?: ReactNode;
    buttonSize?: ButtonProps["size"];
    iconSize?: number;
}

export default function UpdateTaskButton({
    taskDetails,
    variant,
    className,
    iconClassName,
    children,
    buttonSize,
    iconSize = 18,
    ...props
}: UpdateTaskProps) {
    const { showModal } = useModal();

    return (
        <Button
            variant={variant}
            className={className}
            size={buttonSize}
            {...props}
            onClick={() =>
                showModal(<TaskForm task={taskDetails} mode="update" />)
            }
        >
            <Edit className={iconClassName} size={iconSize} />
            &nbsp;{children}
        </Button>
    );
}
