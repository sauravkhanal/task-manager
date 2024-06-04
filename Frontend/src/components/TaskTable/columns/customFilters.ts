import { ITag, IUserDetails } from "@/types";
import fullName from "@/utils/fullName";
import { FilterFn } from "@tanstack/react-table";
import { format } from "date-fns";

interface CustomFilters {
    tagFilter: FilterFn<any>;
    assigneeFilter: FilterFn<any>;
    creatorFilter: FilterFn<any>;
    dateFilter: FilterFn<any>;
}

const customFilters: CustomFilters = {
    tagFilter: (row, columnId, filterValue) => {
        const tags: ITag[] = row.original[columnId];
        return tags.some((tag) =>
            tag.title
                .toLocaleLowerCase()
                .includes(filterValue.toLocaleLowerCase()),
        );
    },
    assigneeFilter: (row, columnId, filterValue) => {
        const assignees: IUserDetails[] = row.original[columnId];
        return assignees.some((assignee) =>
            fullName(assignee)
                .toLocaleLowerCase()
                .includes(filterValue.toLocaleLowerCase()),
        );
    },

    creatorFilter: (row, columnId, filterValue) => {
        const userDetail: IUserDetails = row.original[columnId][0];
        return fullName(userDetail)
            .toLowerCase()
            .includes(filterValue.toLowerCase());
    },

    dateFilter: (row, columnId, filterValue) => {
        const date: Date = row.original[columnId];
        const formattedDate: string = format(
            date,
            "do LLL hh:mm a",
        ).toLowerCase();
        return formattedDate.includes(filterValue.toLowerCase());
    },
};

export default customFilters;
