import * as React from "react";
import { Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { columns } from "../columns";
import { useModal } from "@/context/modalContext";
import { TaskView } from "@/components/TaskView";

interface TableBodyComponentProps {
    table: Table<any>;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ table }) => {
    const { showModal } = useModal();
    return (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        onClick={() =>
                            showModal(<TaskView task={row.original} />)
                        }
                        className="cursor-pointer"
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                )}
                            </TableCell>
                        ))}
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                    >
                        No results.
                    </TableCell>
                </TableRow>
            )}
        </TableBody>
    );
};

export default TableBodyComponent;
