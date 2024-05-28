import { useState } from "react";
import { format } from "date-fns";
import { LuCalendarPlus as CalendarIcon } from "react-icons/lu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { UseFormGetValues, UseFormSetValue, useForm } from "react-hook-form";
import { ITask } from "@/types";
import { useTaskFormContext } from "@/context/createTask.context";

interface DatePickerProps {
    getValues: UseFormGetValues<ITask>;
    setValue: UseFormSetValue<ITask>;
}

export function DatePicker({ getValues, setValue }: DatePickerProps) {
    const [date, setDate] = useState<Date | null>(getValues("dueDate") || null);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            setValue("dueDate", selectedDate);
        }
    };

    // const { methods } = useTaskFormContext();

    return (
        <Popover>
            <PopoverTrigger>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Set Deadline</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date ?? undefined}
                    onSelect={handleDateSelect}
                    initialFocus
                    // {...methods.register("dueDate")}
                />
            </PopoverContent>
        </Popover>
    );
}
