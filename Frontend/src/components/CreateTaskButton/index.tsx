import React from "react";
import { useModal } from "@/context/modalContext";
import CreateTask from "../CreateTask";
import { Button, ButtonProps } from "@/components/ui/button";
import { ClipboardPlus } from "lucide-react";

interface CreateTaskButtonProps extends ButtonProps {
    // variant?: ButtonProps["variant"];
    // size?: ButtonProps["size"];
    iconSize?: number;
}

const CreateTaskButton: React.FC<CreateTaskButtonProps> = ({
    variant = "nav",
    size,
    children,
    className,
    iconSize = 5,
    ...rest
}) => {
    const { showModal } = useModal();

    const handleClick = () => {
        showModal(<CreateTask mode="create" />);
    };

    return (
        <Button
            variant={variant}
            onClick={handleClick}
            className={className}
            {...rest}
            size={size}
        >
            <ClipboardPlus className={`size-${iconSize} mr-2`} />
            {children ? children : "Create Task"}
        </Button>
    );
};

export default CreateTaskButton;
