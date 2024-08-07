import UserCard from "@/components/CreateTask/SelectUser/UserCard";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import useDataContext from "@/context/dataContext";
import { useModal } from "@/context/modalContext";
import { ITag, ITaskWithDetails, IUserDetails } from "@/types";
import { HoverCard } from "@radix-ui/react-hover-card";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteTask } from "./deleteRecoverTask";
import TaskForm from "@/components/CreateTask";
import OpenTaskInNewTabButton from "@/components/OpenTaskInNewTabButton";
const frontendURL = import.meta.env.VITE_FRONTEND_URL;

const cellsUI = {
    tags: ({
        tags,
        variant,
    }: {
        tags: ITag[];
        variant: BadgeProps["variant"];
    }) => {
        let backgroundColor;
        if (variant === "outline") {
            backgroundColor = undefined;
        } else backgroundColor = tags[0]?.color ?? "";
        if (tags.length === 0) return <div className="w-24">&nbsp;</div>;
        if (tags.length === 1)
            return (
                <div className="w-24 max-w-28 overflow-x-hidden">
                    <Badge style={{ backgroundColor }} variant={variant}>
                        {tags[0].title}
                    </Badge>
                </div>
            );
        return (
            <div className="cursor-pointer w-24 ">
                <HoverCard>
                    <HoverCardTrigger className="text-nowrap max-w-28 overflow-x-hidden">
                        <Badge
                            style={{ backgroundColor }}
                            notificationCount={tags.length - 1}
                            variant={variant}
                            className="max-w-28  "
                        >
                            {tags[0].title}
                        </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="flex flex-wrap gap-1 ">
                        {tags.map((tag, index) => (
                            <Badge
                                key={index}
                                style={{ backgroundColor: tag.color }}
                            >
                                {tag.title}
                            </Badge>
                        ))}
                    </HoverCardContent>
                </HoverCard>
            </div>
        );
    },

    assignees: (assignees: IUserDetails[]): JSX.Element => {
        if (!assignees) return <></>;
        return (
            <span className="cursor-pointer flex justify-center">
                <HoverCard>
                    <HoverCardTrigger className="text-nowrap">
                        <Badge className="uppercase" variant={"outline"}>
                            {assignees.length}
                        </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent>
                        <p className="text-sm pb-2">Assigned to :</p>
                        <ScrollArea className="h-50 ">
                            <div className="flex flex-col gap-1">
                                {assignees.map((value, index) => (
                                    <UserCard
                                        key={value.firstName + index}
                                        profileUrl={value.profilePicture}
                                        firstName={value.firstName}
                                        lastName={value.lastName}
                                        onRemove={undefined}
                                    />
                                ))}
                            </div>
                        </ScrollArea>
                    </HoverCardContent>
                </HoverCard>
            </span>
        );
    },

    action: (taskDetail: ITaskWithDetails) => {
        const { refreshData } = useDataContext();
        const { showModal } = useModal();
        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="font-poppins">
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        {/* <span className="sr-only">Open menu</span> */}
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="font-poppins">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            navigator.clipboard.writeText(
                                `${frontendURL}/details/${taskDetail._id}`,
                            );
                            toast.success("Copied successfully !");
                        }}
                    >
                        <Copy size={16} />
                        &nbsp; copy task url
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <OpenTaskInNewTabButton
                            taskID={taskDetail._id}
                            variant={"ghost"}
                            className="w-full h-fit"
                        >
                            View Details
                        </OpenTaskInNewTabButton>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            showModal(
                                <TaskForm task={taskDetail} mode="update" />,
                            );
                        }}
                    >
                        <Edit className="mr-3 size-5" /> Update Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(taskDetail._id, refreshData);
                        }}
                    >
                        <Trash2 className="text-destructive size-5 mr-3" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    },
};

export default cellsUI;
