import { ColumnDef } from "@tanstack/react-table";
import { IAllTask, IUserDetails } from "@/types";

export const columns: ColumnDef<IAllTask>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => <div>{row.getValue("dueDate")}</div>,
    },
    {
        accessorKey: "priority",
        header: "Priority",
        cell: ({ row }) => <div>{row.getValue("priority")}</div>,
    },
    {
        accessorKey: "workflowStage",
        header: "Workflow Stage",
        cell: ({ row }) => <div>{row.getValue("workflowStage")}</div>,
    },

    {
        accessorKey: "creatorID",
        header: "Assigner",
        cell: ({ row }) => {
            const creatorDetail: IUserDetails = row.getValue("creatorID");
            return (
                <div>
                    {creatorDetail.firstName + " " + creatorDetail.lastName}
                </div>
            );
        },
    },
];
