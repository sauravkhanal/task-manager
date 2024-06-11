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
import { ITaskWithDetails, TaskPriority } from "@/types";
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

export function SelectPriority({
    placeholder,
    label,
    items,
    setValue,
    prevValue,
}: {
    placeholder: string;
    initialValue?: TaskPriority;
    label: string;
    items: {
        title: TaskPriority;
        color: string;
    }[];
    setValue: UseFormSetValue<ITaskWithDetails>;
    prevValue?: TaskPriority;
}) {
    useEffect(() => {
        setValue("priority", prevValue || TaskPriority.LOW);
    }, []);
    return (
        <Select
            onValueChange={(value) => {
                setValue("priority", value as TaskPriority);
            }}
            defaultValue={prevValue || TaskPriority.LOW}
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
