import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUpDown, SortAsc, SortDesc } from "lucide-react";
import { ColumnDefTemplate, HeaderContext } from "@tanstack/react-table";
import { ITaskWithDetails } from "@/types";

type IHeader<T> = {
    [key in keyof T]?:
        | ColumnDefTemplate<HeaderContext<ITaskWithDetails, unknown>>
        | undefined;
};

function SortIcon({ column }: { column: Column<any> }) {
    return column.getIsSorted() ? (
        column.getIsSorted() === "asc" ? (
            <SortAsc className="ml-2 h-4 w-4" />
        ) : (
            <SortDesc className="ml-2 h-4 w-4" />
        )
    ) : (
        <ArrowUpDown className="ml-2 h-4 w-4" />
    );
}

const headers: IHeader<ITaskWithDetails> = {
    title: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting()}>
                Title <SortIcon column={column} />
            </Button>
        );
    },

    dueDate: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting()}>
                Due Date <SortIcon column={column} />
            </Button>
        );
    },

    workflowStage: ({ column }) => {
        return (
            <Button variant="ghost" onClick={() => column.toggleSorting()}>
                Workflow Stage <SortIcon column={column} />
            </Button>
        );
    },
};

export default headers;
