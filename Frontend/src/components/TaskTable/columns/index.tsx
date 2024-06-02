import { ColumnDef } from "@tanstack/react-table";
import { ITaskWithDetails } from "@/types";
import cells from "./cells";
import customFilters from "./customFilters";
import headers from "./headers";
import customSortingFunctions from "./customSortingFunctions";

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
        header: "Created By",
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
        header: "Tags",
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
        cell: cells.action,
    },
    {
        id: "checkbox",
        enableHiding: false,
    },
];
