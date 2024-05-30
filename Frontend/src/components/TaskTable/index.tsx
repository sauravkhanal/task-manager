import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Table } from "@/components/ui/table";
import ColumnVisibilityDropdown from "./ColumnVisibilityDropdown";
import TableHeaderComponent from "./TableHeaderComponent";
import PaginationComponent from "./PaginationComponent";
import FilterInput from "./FilterInput";
import { columns } from "./columns";
import useDataContext from "@/context/dataContext";
import { useState } from "react";
import { CheckboxColumn } from "./columns/CheckboxColumn";
import TableBodyComponent from "./TableBodyComponent";

export function DataTableDemo() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
        description: false,
        attachmentIDs: false,
        commentIDs: false,
        activityIDs: false,
        deleted: false,
        priority: false,
    });
    const [rowSelection, setRowSelection] = useState({});

    const context = useDataContext();
    const data = context.tasks;
    const table = useReactTable({
        data,
        columns: [CheckboxColumn, ...columns],
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full overflow-x-auto">
            <div className="flex items-center py-4">
                <FilterInput table={table} />
                <ColumnVisibilityDropdown table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeaderComponent table={table} />
                    <TableBodyComponent table={table} />
                </Table>
            </div>
            <PaginationComponent table={table} />
        </div>
    );
}
