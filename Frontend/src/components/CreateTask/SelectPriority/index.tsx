import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ITask, TaskPriority } from "@/types";
import { useFormContext } from "react-hook-form";

export const priority: { title: TaskPriority; _id: string; color: string }[] = [
    {
        title: TaskPriority.LOW,
        _id: "LOW_ID",
        color: "#016e2d",
    },
    {
        title: TaskPriority.MED,
        color: "#FFD700",
        _id: "MED_ID",
    },
    {
        title: TaskPriority.HIGH,
        color: "#fa1302",
        _id: "HIGH_ID",
    },
];
export function SelectPriority() {
    const formMethods = useFormContext<ITask>();
    const defaultPriority =
        formMethods.getValues("priority") || TaskPriority.LOW;
    formMethods.setValue("priority", defaultPriority);
    return (
        <Select
            onValueChange={(value) => {
                formMethods.setValue("priority", value as TaskPriority);
            }}
            defaultValue={defaultPriority}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    placeholder={"Select Priority"}
                    className="font-semibold"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    {priority.map((item) => (
                        <SelectItem value={item.title} key={item.title}>
                            <Badge variant={item.title}>{item.title}</Badge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
