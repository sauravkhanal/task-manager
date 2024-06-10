import * as React from "react";
import { Table } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { columns } from "../columns";
import { useModal } from "@/context/modalContext";
import TaskView from "@/pages/TaskView";
// import useDataContext from "@/context/dataContext";
// import { Skeleton } from "@/components/ui/skeleton";

interface TableBodyComponentProps {
    table: Table<any>;
}

const TableBodyComponent: React.FC<TableBodyComponentProps> = ({ table }) => {
    const { showModal } = useModal();
    // const { loading } = useDataContext();
    // if (loading)
    //     return (
    //         <TableBody>
    //             {Array(10)
    //                 .fill(0)
    //                 .map((_, index) => (
    //                     <TableRow key={index}>
    //                         {columns.map((_, colIndex) => (
    //                             <TableCell key={colIndex}>
    //                                 <Skeleton className="w-[100px] h-[20px] rounded-sm my-2" />
    //                             </TableCell>
    //                         ))}
    //                     </TableRow>
    //                 ))}
    //         </TableBody>
    //     );
    return (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className="cursor-pointer"
                        onClick={() =>
                            showModal(<TaskView taskDetails={row.original} />)
                        }
                    >
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {
                                    // loading ? (
                                    //     cell.id === "select" ? (
                                    //         <Skeleton className="w-4 h-[20px] rounded-sm my-2" />
                                    //     ) : (
                                    //         <Skeleton className="w-full h-[20px] rounded-sm my-2" />
                                    //     )
                                    // ) :
                                    flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )
                                }
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
