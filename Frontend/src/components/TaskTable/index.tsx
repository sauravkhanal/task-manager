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
import { useEffect, useState } from "react";
import { CheckboxColumn } from "./columns/CheckboxColumn";
import TableBodyComponent from "./TableBodyComponent";
import { ITaskWithDetails } from "@/types";
import recoverSelectedFieldsFromTable from "@/utils/recoverSelectedFieldsFromTable";
import BulkSelectActions from "./BulkSelectActions";

export default function DataTable({ data }: { data: ITaskWithDetails[] }) {
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

    const [selectedRowIDs, setSelectedRowIDs] = useState<string[]>([]);
    useEffect(() => {
        setSelectedRowIDs(
            recoverSelectedFieldsFromTable<ITaskWithDetails>({
                table,
                key: "_id",
            }),
        );
    }, [rowSelection]);

    return (
        <div className="w-full overflow-x-auto max-w-5xl">
            <div className="flex items-center py-2">
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
            <div>
                {selectedRowIDs.length > 0 && (
                    <BulkSelectActions
                        className="fixed bottom-2 translate-x-2/3"
                        selectedIDs={selectedRowIDs}
                        clearSelections={() => setRowSelection({})}
                    />
                )}
            </div>
        </div>
    );
}
