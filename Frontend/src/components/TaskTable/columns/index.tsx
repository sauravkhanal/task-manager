import { ColumnDef } from "@tanstack/react-table";
import { IAllTask } from "@/types";
import cells from "./cells";
import customFilters from "./customFilters";
import headers from "./headers";
import customSortingFunctions from "./customSortingFunctions";

export const columns: ColumnDef<IAllTask>[] = [
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
        accessorKey: "creatorID",
        header: headers.creatorID,
        cell: cells.creatorID,
        filterFn: customFilters.creatorFilter,
    },
    {
        accessorKey: "assigneeIDs",
        header: "Assignee",
        filterFn: customFilters.assigneeFilter,
        cell: cells.assigneeIDs,
    },
    {
        accessorKey: "tagIDs",
        header: "Tags",
        filterFn: customFilters.tagFilter,
        cell: cells.tagIDs,
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
];
