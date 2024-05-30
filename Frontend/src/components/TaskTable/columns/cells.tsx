import UserCard from "@/components/SelectUser/UserCard";
import { Badge } from "@/components/ui/badge";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    IAllTask,
    ITag,
    IUserDetails,
    TaskPriority,
    WorkflowStage,
} from "@/types";

import { Row } from "@tanstack/react-table";
import { format } from "date-fns";

type CellFunction<T> = (params: { row: Row<T> }) => JSX.Element | string | null;

type ICells = {
    [K in keyof IAllTask]?: CellFunction<IAllTask>;
};

const cells: ICells = {
    title: ({ row }) => {
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
    dueDate: ({ row }) => {
        const date: Date = row.getValue("dueDate");
        return (
            <p className="text-center text-nowrap">
                {format(date, "do LLL hh:mm a")}
            </p>
        );
    },
    workflowStage: ({ row }) => {
        const workflowStage: WorkflowStage = row.getValue("workflowStage");
        return <Badge variant={workflowStage}>{workflowStage}</Badge>;
    },
    creatorID: ({ row }) => {
        const creatorDetail: IUserDetails = row.getValue("creatorID");
        return `${creatorDetail.firstName} ${creatorDetail.lastName}`;
    },
    assigneeIDs: ({ row }) => {
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
    tagIDs: ({ row }) => {
        const tags: ITag[] = row.getValue("tagIDs");
        if (tags.length === 0) return null;
        if (tags.length === 1)
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
    description: ({ row }) => {
        const description: string = row.getValue("description");
        return (
            <div className="text-ellipsis w-36 lg:w-64 line-clamp-1">
                {description}
            </div>
        );
    },
    attachmentIDs: ({ row }) => {
        const attachments: string[] = row.getValue("attachmentIDs");
        return <div className="text-center">{attachments.length}</div>;
    },
    commentIDs: ({ row }) => {
        const comments: string[] = row.getValue("commentIDs");
        return <div className="text-center">{comments.length}</div>;
    },
    activityIDs: ({ row }) => {
        const activities: string[] = row.getValue("activityIDs");
        return <div className="text-center">{activities.length}</div>;
    },
    deleted: ({ row }) => {
        const deleted: boolean = row.getValue("deleted");
        return <div className="text-center">{deleted ? "Yes" : "No"}</div>;
    },
};

export default cells;
