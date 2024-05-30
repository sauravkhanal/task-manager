import * as React from "react";
import { Table } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";

interface TableHeaderComponentProps {
    table: Table<any>;
}

const TableHeaderComponent: React.FC<TableHeaderComponentProps> = ({
    table,
}) => (
    <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                        {header.isPlaceholder
                            ? null
                            : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                              )}
                    </TableHead>
                ))}
            </TableRow>
        ))}
    </TableHeader>
);

export default TableHeaderComponent;
