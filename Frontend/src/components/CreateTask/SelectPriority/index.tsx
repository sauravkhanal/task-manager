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
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

export function SelectPriority({
    placeholder,
    label,
    items,
    setValue,
    getValues,
}: {
    placeholder: string;
    initialValue?: TaskPriority;
    label: string;
    items: {
        title: TaskPriority;
        color: string;
    }[];
    setValue: UseFormSetValue<ITaskWithDetails>;
    getValues: UseFormGetValues<ITaskWithDetails>;
}) {
    useEffect(() => {
        setValue("priority", getValues("priority") || TaskPriority.LOW);
    }, []);
    return (
        <Select
            onValueChange={(value) => {
                setValue("priority", value as TaskPriority);
            }}
            defaultValue={getValues("priority") || TaskPriority.LOW}
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
