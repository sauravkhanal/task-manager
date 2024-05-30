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
import { UseFormSetValue } from "react-hook-form";
import { Badge } from "../ui/badge";

export function SelectPriority({
    placeholder,
    initialValue = TaskPriority.LOW,
    label,
    items,
    setValue,
}: {
    placeholder: string;
    initialValue?: TaskPriority;
    label: string;
    items: {
        title: TaskPriority;
        color: string;
    }[];
    setValue: UseFormSetValue<ITask>;
}) {
    return (
        <Select
            onValueChange={(value) => {
                setValue("priority", value as TaskPriority);
            }}
            defaultValue={initialValue}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue
                    placeholder={placeholder}
                    className="font-semibold"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{label}</SelectLabel>
                    {items.map((item) => (
                        <SelectItem value={item.title} key={item.title}>
                            <Badge variant={item.title}>{item.title}</Badge>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
