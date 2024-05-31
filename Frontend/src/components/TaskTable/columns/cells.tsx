import UserCard from "@/components/CreateTask/SelectUser/UserCard";
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
import { ChangePriorityDialog } from "../ChangePriorityDialog";
import { ChangeWorkflowStageDialog } from "../ChangeWorkflowStageDialog";
import fullName from "@/utils/fullName";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTask } from "./deleteRecoverTask";
import useDataContext from "@/context/dataContext";

type CellFunction<T> = (params: { row: Row<T> }) => JSX.Element | string | null;

type ICells = {
    [K in keyof IAllTask]?: CellFunction<IAllTask>;
} & {
    action: CellFunction<IAllTask>;
};

const cells: ICells = {
    title: ({ row }) => {
        const title: string = row.getValue("title");
        const rowData: IAllTask = row.original; // Access the entire row's data
        const priority: TaskPriority = rowData.priority;

        return (
            <div className="text-ellipsis w-36 lg:w-64 line-clamp-1 capitalize">
                {priority && <ChangePriorityDialog taskDetail={rowData} />}
                &nbsp;
                {title.slice(0, 50)}
            </div>
        );
    },
    priority: ({ row }) => {
        const priority: TaskPriority = row.getValue("priority");
        return <Badge variant={priority}>{priority}</Badge>;
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
        const rowData: IAllTask = row.original; // Access the entire row's data

        return (
            <div className="text-center">
                {workflowStage && (
                    <ChangeWorkflowStageDialog taskDetail={rowData} />
                )}
            </div>
        );
    },
    creatorID: ({ row }) => {
        const creatorDetail: IUserDetails = row.getValue("creatorID");
        return (
            <div className="w-28 text-nowrap overflow-hidden overflow-ellipsis">
                {fullName(creatorDetail)}
                {/* <UserCard
                    firstName={creatorDetail.firstName}
                    middleName={creatorDetail.middleName}
                    lastName={creatorDetail.lastName}
                    profileUrl={creatorDetail.profilePicture}
                    onRemove={() => {}}
                /> */}
            </div>
        );
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
        if (tags.length === 0) return <div className="w-24">&nbsp;</div>;
        if (tags.length === 1)
            return (
                <div className="w-24 overflow-x-hidden">
                    <Badge
                        style={{ backgroundColor: tags[0].color }}
                        className="text-white uppercase"
                    >
                        {tags[0].title}
                    </Badge>
                </div>
            );
        return (
            <div className="cursor-pointer w-24 ">
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
            </div>
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
    action: ({ row }) => {
        const taskDetail = row.original;
        const { refreshData } = useDataContext();
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => {
                            navigator.clipboard.writeText(taskDetail._id);
                            toast.success("Copied successfully !");
                        }}
                    >
                        copy task id
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() =>
                            deleteTask(row.original._id, refreshData)
                        }
                    >
                        <Trash2 className="text-destructive size-5 mr-1" />
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PencilLine className="mr-1 size-5" /> Update task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
};

export default cells;
