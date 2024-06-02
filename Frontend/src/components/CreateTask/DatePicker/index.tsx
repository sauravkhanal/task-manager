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
import { UseFormGetValues, UseFormSetValue } from "react-hook-form";
import { ITaskWithDetails } from "@/types";

interface DatePickerProps {
    getValues: UseFormGetValues<ITaskWithDetails>;
    setValue: UseFormSetValue<ITaskWithDetails>;
}

export function DatePicker({ getValues, setValue }: DatePickerProps) {
    const initialDate =
        getValues("dueDate") ||
        (() => {
            const date = new Date();
            date.setDate(date.getDate() + 1); // Set to tomorrow
            date.setHours(17, 0, 0, 0); // Set time to 5 PM
            return date;
        })();
    const [date, setDate] = useState<Date | null>(initialDate);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
            setDate(selectedDate);
            setValue("dueDate", selectedDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !date && "text-muted-foreground",
                    )}
                >
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar
                    mode="single"
                    selected={date!}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}
