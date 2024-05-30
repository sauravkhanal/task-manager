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
import TableBodyComponent from "./TableBodyComponent";
import PaginationComponent from "./PaginationComponent";
import FilterInput from "./FilterInput";
import { columns } from "./columns";
import useDataContext from "@/context/dataContext";
import { useState } from "react";

export function DataTableDemo() {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [rowSelection, setRowSelection] = useState({});

    const context = useDataContext();
    const data = context.tasks;
    const table = useReactTable({
        data,
        columns,
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
        <div className="w-full">
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