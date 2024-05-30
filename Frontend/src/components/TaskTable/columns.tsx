import { ColumnDef, FilterFn, Row } from "@tanstack/react-table";
import {
    IAllTask,
    ITag,
    IUserDetails,
    WorkflowStage,
    TaskPriority,
} from "@/types";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import UserCard from "../SelectUser/UserCard";
import { ScrollArea } from "../ui/scroll-area";
import fullName from "@/utils/fullName";

const tagFilter: FilterFn<any> = (row, columnId, filterValue) => {
    const tags: ITag[] = row.original[columnId];
    return tags.some((tag) =>
        tag.title.toLocaleLowerCase().includes(filterValue.toLocaleLowerCase()),
    );
};
const assigneeFilter: FilterFn<any> = (row, columnId, filterValue) => {
    const assignees: IUserDetails[] = row.original[columnId];
    return assignees.some((assignee) =>
        fullName(assignee)
            .toLocaleLowerCase()
            .includes(filterValue.toLocaleLowerCase()),
    );
};

const creatorFilter: FilterFn<any> = (row, columnId, filterValue) => {
    const userDetail: IUserDetails = row.original[columnId];
    return fullName(userDetail)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
};

export const columns: ColumnDef<IAllTask>[] = [
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => {
            const title: string = row.getValue("title");
            const rowData: IAllTask = row.original; // Access the entire row's data
            const priority: TaskPriority = rowData.priority;

            return (
                <div className="text-ellipsis w-36 lg:w-64 line-clamp-1 capitalize">
                    {priority && <Badge variant={priority}>{priority}</Badge>}
                    &nbsp;
                    {title.slice(0, 50)}
                </div>
            );
        },
    },

    {
        accessorKey: "time",
        header: "Time",
        cell: ({ row }) => {
            const date: Date = row.getValue("dueDate");
            return (
                <p className="text-center text-nowrap">
                    {format(date, "hh:mm a")}
                </p>
            );
        },
    },
    {
        accessorKey: "dueDate",
        header: "Due Date",
        cell: ({ row }) => {
            const date: Date = row.getValue("dueDate");
            return (
                <p className="text-center text-nowrap">
                    {format(date, "do LLL")}
                </p>
            );
        },
    },

    {
        accessorKey: "workflowStage",
        header: "Workflow Stage",
        cell: ({ row }) => {
            const workflowStage: WorkflowStage = row.getValue("workflowStage");
            return <Badge variant={workflowStage}>{workflowStage}</Badge>;
        },
    },
    {
        accessorKey: "creatorID",
        header: "Assigner",
        cell: ({ row }) => {
            const creatorDetail: IUserDetails = row.getValue("creatorID");
            return `${creatorDetail.firstName} ${creatorDetail.lastName}`;
        },
        filterFn: creatorFilter,
    },

    {
        accessorKey: "assigneeIDs",
        header: "Assignee",
        filterFn: assigneeFilter,
        cell: ({ row }) => {
            const assignee: IUserDetails[] = row.getValue("assigneeIDs");
            if (!assignee) return null;

            return (
                <span className="cursor-pointer flex justify-center">
                    <HoverCard>
                        <HoverCardTrigger className="text-nowrap">
                            <Badge className="uppercase" variant={"outline"}>
                                {assignee.length}
                            </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent>
                            <ScrollArea className="h-50 ">
                                <div className="flex flex-col gap-1">
                                    {assignee.map((value, index) => (
                                        <UserCard
                                            key={value.firstName + index}
                                            profileUrl={value.profilePicture}
                                            firstName={value.firstName}
                                            lastName={value.lastName}
                                            onRemove={() => {}}
                                        />
                                    ))}
                                </div>
                            </ScrollArea>
                        </HoverCardContent>
                    </HoverCard>
                </span>
            );
        },
    },

    {
        accessorKey: "tagIDs",
        header: "Tags",
        filterFn: tagFilter,
        cell: ({ row }) => {
            const tags: ITag[] = row.getValue("tagIDs");
            if (tags.length == 0) return null;
            if (tags.length == 1)
                return (
                    <Badge
                        style={{ backgroundColor: tags[0].color }}
                        className="text-white uppercase"
                    >
                        {tags[0].title}
                    </Badge>
                );
            return (
                <span className="cursor-pointer">
                    <HoverCard>
                        <HoverCardTrigger className="text-nowrap">
                            <Badge
                                style={{ backgroundColor: tags[0].color }}
                                className="uppercase"
                                notificationCount={tags.length - 1}
                                variant={"custom"}
                            >
                                {tags[0].title}
                            </Badge>
                        </HoverCardTrigger>
                        <HoverCardContent className="flex flex-wrap gap-1">
                            {tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    style={{ backgroundColor: tag.color }}
                                    className="uppercase text-white"
                                >
                                    {tag.title}
                                </Badge>
                            ))}
                        </HoverCardContent>
                    </HoverCard>
                </span>
            );
        },
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({ row }) => {
            const description: string = row.getValue("description");
            return (
                <div className="text-ellipsis w-36 lg:w-64 line-clamp-1">
                    {description}
                </div>
            );
        },
    },
    {
        accessorKey: "attachmentIDs",
        header: "Attachments",
        cell: ({ row }) => {
            const attachments: string[] = row.getValue("attachmentIDs");
            return <div className="text-center">{attachments.length}</div>;
        },
    },
    {
        accessorKey: "commentIDs",
        header: "Comments",
        cell: ({ row }) => {
            const comments: string[] = row.getValue("commentIDs");
            return <div className="text-center">{comments.length}</div>;
        },
    },
    {
        accessorKey: "activityIDs",
        header: "Activities",
        cell: ({ row }) => {
            const activities: string[] = row.getValue("activityIDs");
            return <div className="text-center">{activities.length}</div>;
        },
    },
    {
        accessorKey: "deleted",
        header: "Deleted",
        cell: ({ row }) => {
            const deleted: boolean = row.getValue("deleted");
            return <div className="text-center">{deleted ? "Yes" : "No"}</div>;
        },
    },
];
