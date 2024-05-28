import { ITask, TaskPriority } from "@/types";
import { createContext, useContext, ReactNode } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

interface ITaskFormContext {
    methods: UseFormReturn<ITask>;
}

const TaskFormContext = createContext<ITaskFormContext | undefined>(undefined);

export function useTaskFormContext(): ITaskFormContext {
    const context = useContext(TaskFormContext);
    if (!context) {
        throw new Error(
            "useTaskFormContext must be used within a TaskFormProvider",
        );
    }
    return context;
}

export const TaskFormProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const methods = useForm<ITask>({
        defaultValues: {
            title: "",
            description: "",
            priority: TaskPriority.LOW,
            assigneeIDs: [],
            tagIDs: [],
            dueDate: undefined,
        },
    });

    return (
        <TaskFormContext.Provider value={{ methods }}>
            {children}
        </TaskFormContext.Provider>
    );
};
