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
import { useEffect } from "react";
import { UseFormSetValue } from "react-hook-form";

export function SelectItems({
    placeholder,
    prevValue,
    label,
    items,
    setValue,
}: {
    placeholder: string;
    prevValue?: TaskPriority;
    label: string;
    items: {
        title: TaskPriority;
        color: string;
    }[];
    setValue: UseFormSetValue<ITask>;
}) {
    useEffect(() => {
        setValue("priority", prevValue ?? TaskPriority.LOW);
    }, []);
    return (
        <Select
            onValueChange={(value) => {
                setValue("priority", value as TaskPriority);
                console.log("Priority changed: ", value);
            }}
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
                            <p
                                className="font-semibold mr-2 px-2 py-1 rounded"
                                style={{ background: item.color }}
                            >
                                {item.title}
                            </p>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
