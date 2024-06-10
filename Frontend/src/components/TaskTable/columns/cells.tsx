import { Badge } from "@/components/ui/badge";
import {
    ITaskWithDetails,
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
import cellsUI from "./cellsUI";

type CellFunction<T> = (params: { row: Row<T> }) => JSX.Element | string | null;

type ICells = {
    [K in keyof ITaskWithDetails]?: CellFunction<ITaskWithDetails>;
} & {
    action: CellFunction<ITaskWithDetails>;
};

const cells: ICells = {
    title: ({ row }) => {
        const title: string = row.getValue("title");
        const rowData: ITaskWithDetails = row.original; // Access the entire row's data
        const priority: TaskPriority = rowData.priority;
        return (
            <div className="text-ellipsis w-36 lg:w-60 line-clamp-1 capitalize">
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
        const rowData: ITaskWithDetails = row.original; // Access the entire row's data

        return (
            <div className="text-center">
                {workflowStage && (
                    <ChangeWorkflowStageDialog taskDetail={rowData} />
                )}
            </div>
        );
    },
    creator: ({ row }) => {
        const creatorDetail: IUserDetails[] = row.getValue("creator");
        return (
            <div className="w-28 text-nowrap overflow-hidden overflow-ellipsis">
                {fullName({ ...creatorDetail[0] })}
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
    assignees: ({ row }) => {
        const assignee: IUserDetails[] = row.getValue("assignees");
        return cellsUI.assignees(assignee);
    },
    tags: ({ row }) => {
        const tags: ITag[] = row.getValue("tags");
        return cellsUI.tags({ tags, variant: "CUSTOM" });
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
        return cellsUI.action(taskDetail);
    },
};

export default cells;
