import { IComment } from "@/types";
import { format, formatDistanceToNow } from "date-fns";
import { useContext, useEffect, useState } from "react";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import FormatUsername from "./FormatUsername";
import taskAPI from "@/api/taskAPI";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit } from "lucide-react";
import LoadingIcon from "@/components/LoadingIcon";
import DeleteAlertDialog from "@/components/DeleteAlertDialog";
import { AuthContext } from "@/context/authContext";

export default function Comments({
    taskID,
    setLengths,
}: {
    taskID: string;
    setLengths: React.Dispatch<
        React.SetStateAction<{
            activity: number;
            comments: number;
        }>
    >;
}) {
    const [comments, setComments] = useState<IComment[]>([]);
    const [newComment, setNewComment] = useState<string>("");
    const [updatedComment, setUpdatedComment] = useState<string>("");
    const [dialogOpen, setDialogOpen] = useState<{
        [key: string]: boolean;
    }>({});

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const authContext = useContext(AuthContext);

    async function fetchDetails() {
        try {
            setIsLoading(true);
            const response = await taskAPI.getAllComments(taskID);
            if (response.success) {
                const comments = response.data as IComment[];
                setComments(comments);
                setLengths((prev) => {
                    return { ...prev, comments: comments.length };
                });
            } else {
                console.error("Failed to fetch comments", response.message);
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchDetails();
    }, []);

    async function handleCreateComment(description: string) {
        if (!newComment.trim()) return;
        try {
            setIsCreating(true);
            const response = await taskAPI.createComment(taskID, description);
            if (response.success) {
                toast.success(response.message);
                fetchDetails();
                setNewComment("");
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error("Error creating comment:", error);
        }
        setIsCreating(false);
    }

    async function handleDeleteComment(commentID: string) {
        try {
            setIsLoading(true);
            const response = await taskAPI.deleteComment(taskID, commentID);
            if (response.success) {
                toast.success(response.message);
                // fetchDetails();
                setComments((prev) => {
                    return prev.filter((comment) => comment._id !== commentID);
                });
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error("Error deleting comment:", error);
        }
        setIsLoading(false);
    }

    async function handleUpdateComment(commentID: string, description: string) {
        try {
            setIsUpdating(true);
            const response = await taskAPI.updateComment(
                commentID,
                description,
            );
            if (response.success) {
                toast.success(response.message);
                // fetchDetails();
                setComments((prev) => {
                    return prev.map((comment) =>
                        comment._id !== commentID
                            ? comment
                            : { ...comment, description: description },
                    );
                });
                setUpdatedComment("");
                setDialogOpen({ ...dialogOpen, [commentID]: false });
            } else {
                toast.error(response.message);
            }
        } catch (error: any) {
            console.error("Error updating comment:", error);
        }
        setIsUpdating(false);
    }

    function FormatDate(date: string) {
        const renderDate = formatDistanceToNow(new Date(date), {
            addSuffix: true,
        });
        return (
            <HoverCard>
                <HoverCardTrigger className="cursor-pointer">
                    &nbsp;{renderDate}.
                </HoverCardTrigger>
                <HoverCardContent className="p-2 w-fit font-semibold">
                    &nbsp;
                    {format(new Date(date), "do LLL yyyy, hh:mm a")}
                </HoverCardContent>
            </HoverCard>
        );
    }

    return (
        <div className="grid bg-accent p-4 rounded-sm w-full">
            <div className="mb-4 grid gap-2">
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="min-h-24"
                />
                <Button
                    onClick={() => handleCreateComment(newComment)}
                    className="justify-self-end relative"
                    // disabled={!newComment.trim()}
                >
                    <LoadingIcon isLoading={isCreating} className="">
                        Add comment
                    </LoadingIcon>
                </Button>
            </div>

            <LoadingIcon isLoading={isLoading} className="min-w-full">
                {comments.length > 0 ? (
                    <div className="grid gap-4 min-w-full">
                        {[...comments].reverse().map((comment) => (
                            <Card key={comment._id} className="relative w-full">
                                <CardHeader className="w-full">
                                    <CardTitle>
                                        <div className="grid md:flex items-center">
                                            {
                                                <FormatUsername
                                                    username={
                                                        comment.creatorUsername!
                                                    }
                                                />
                                            }
                                            <span className="font-normal text-xs md:text-sm">
                                                <span className="space-x-1 hidden md:inline">
                                                    commented
                                                </span>
                                                {FormatDate(comment.createdAt!)}
                                            </span>
                                        </div>
                                    </CardTitle>
                                    <hr />
                                </CardHeader>
                                <CardContent className="">
                                    <div className="text-justify">
                                        {comment.description}
                                    </div>
                                    <div className="flex mt-2 space-x-2">
                                        {authContext.getUserDetails()
                                            ?.username ===
                                        comment.creatorUsername ? (
                                            <>
                                                <DeleteAlertDialog
                                                    onContinueAction={() =>
                                                        handleDeleteComment(
                                                            comment._id!,
                                                        )
                                                    }
                                                    item="comment"
                                                />
                                                <Dialog
                                                    open={
                                                        dialogOpen[comment._id!]
                                                    }
                                                    onOpenChange={(isOpen) =>
                                                        setDialogOpen({
                                                            ...dialogOpen,
                                                            [comment._id!]:
                                                                isOpen,
                                                        })
                                                    }
                                                >
                                                    <DialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            className="absolute top-2 right-2"
                                                            size="sm"
                                                        >
                                                            <Edit className="size-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent>
                                                        <DialogHeader>
                                                            <DialogTitle>
                                                                Update comment
                                                            </DialogTitle>
                                                            <DialogDescription>
                                                                Make changes to
                                                                the comment
                                                                here.
                                                            </DialogDescription>
                                                        </DialogHeader>
                                                        <Textarea
                                                            placeholder="Updated comment content"
                                                            onChange={(e) =>
                                                                setUpdatedComment(
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            value={
                                                                updatedComment
                                                            }
                                                        ></Textarea>
                                                        <Button
                                                            onClick={() =>
                                                                handleUpdateComment(
                                                                    comment._id!,
                                                                    updatedComment,
                                                                )
                                                            }
                                                        >
                                                            <LoadingIcon
                                                                isLoading={
                                                                    isUpdating
                                                                }
                                                            >
                                                                Update comment
                                                            </LoadingIcon>
                                                        </Button>
                                                    </DialogContent>
                                                </Dialog>{" "}
                                            </>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div>No comments found</div>
                )}
            </LoadingIcon>
        </div>
    );
}
