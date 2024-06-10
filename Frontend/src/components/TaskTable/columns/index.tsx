import { ColumnDef } from "@tanstack/react-table";
import { ITaskWithDetails } from "@/types";
import cells from "./cells";
import customFilters from "./customFilters";
import headers from "./headers";
import customSortingFunctions from "./customSortingFunctions";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<ITaskWithDetails>[] = [
    {
        accessorKey: "title",
        header: headers.title,
        cell: cells.title,
    },
    {
        accessorKey: "dueDate",
        header: headers.dueDate,
        cell: cells.dueDate,
        filterFn: customFilters.dateFilter,
    },
    {
        accessorKey: "workflowStage",
        header: headers.workflowStage,
        cell: cells.workflowStage,
        sortingFn: customSortingFunctions.workflowStage,
    },
    {
        accessorKey: "creator",
        header: () => <div className="w-28 text-center">Created By</div>,
        cell: cells.creator,
        filterFn: customFilters.creatorFilter,
    },
    {
        accessorKey: "assignees",
        header: "Assignee",
        filterFn: customFilters.assigneeFilter,
        cell: cells.assignees,
    },
    {
        accessorKey: "tags",
        header: () => <div className="w-24 text-center">Tags</div>,
        filterFn: customFilters.tagFilter,
        cell: cells.tags,
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: cells.description,
    },
    {
        accessorKey: "attachmentIDs",
        header: "Attachments",
        cell: cells.attachmentIDs,
    },

    {
        accessorKey: "commentIDs",
        header: "Comments",
        cell: cells.commentIDs,
    },
    {
        accessorKey: "activityIDs",
        header: "Activities",
        cell: cells.activityIDs,
    },
    {
        accessorKey: "deleted",
        header: "Deleted",
        cell: cells.deleted,
    },
    {
        accessorKey: "priority",
        header: "Priority",
    },
    {
        id: "actions",
        enableHiding: false,
        header: () => (
            <Button variant="ghost" className="h-8 w-8 p-0" disabled>
                <MoreHorizontal />
            </Button>
        ),
        cell: cells.action,
    },
    {
        id: "checkbox",
        enableHiding: false,
    },
];
