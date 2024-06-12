import { useEffect } from "react";
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
import { useFormContext } from "react-hook-form";
import { ITask } from "@/types";

export function DatePicker() {
    const { setValue, getValues, watch } = useFormContext<ITask>();
    const date = watch("dueDate");
    useEffect(() => {
        if (!getValues("dueDate")) {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            date.setHours(17, 0, 0, 0);
            setValue("dueDate", date);
        }
    }, []);

    const handleDateSelect = (selectedDate: Date | undefined) => {
        if (selectedDate) {
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
