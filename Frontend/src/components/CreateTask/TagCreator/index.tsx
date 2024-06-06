import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../../ui/textarea";
import { ITag } from "@/types";
import tagAPI from "@/api/tagAPI";
import { toast } from "sonner";
import LoadingIcon from "../../LoadingIcon";
import { useForm } from "react-hook-form";
import { useState } from "react";
import useDataContext from "@/context/dataContext";

function useTagForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const [loading, setLoading] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);

    const { refreshData } = useDataContext();

    async function createTag({ title, description, color }: Partial<ITag>) {
        setLoading(true);
        const response = await tagAPI.createTag({ title, description, color });
        if (response.success) {
            toast.success(response.message);
            setDialogOpen(false);
            refreshData({ tags: true });
        } else {
            toast.error(response.data.title);
            if (response.data.title)
                setError("title", {
                    type: "custom",
                    message: response.data.title,
                });
        }
        setLoading(false);
    }

    async function handleNestedFormSubmit(
        event: React.FormEvent<HTMLFormElement>,
    ) {
        event.preventDefault();
        event.stopPropagation();
        handleSubmit(createTag)();
    }

    return {
        register,
        handleNestedFormSubmit,
        errors,
        loading,
        createTag,
        dialogOpen,
        setDialogOpen,
    };
}

export function TagCreator() {
    const {
        register,
        handleNestedFormSubmit,
        errors,
        loading,
        dialogOpen,
        setDialogOpen,
    } = useTagForm();

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="w-full">
                    Create new tag
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New Tag</DialogTitle>
                </DialogHeader>

                <form id="nested" onSubmit={handleNestedFormSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className={`col-span-3 ${
                                    errors.title && " border-red-600"
                                }`}
                                {...register("title", {
                                    required: "Title is required",
                                })}
                                placeholder="Name of the tag."
                            />
                            {errors.title && (
                                <p className="text-red-600 text-sm col-span-3 col-start-2 justify-self-start">
                                    {errors.title.message?.toString()}
                                </p>
                            )}
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                className="col-span-3"
                                {...register("description")}
                                placeholder="Description about the tag (optional)."
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="color" className="text-right">
                                Color
                            </Label>
                            <Input
                                id="color"
                                className="col-span-3 min-h-12"
                                type="color"
                                {...register("color")}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="submit"
                            disabled={Object.keys(errors).length > 0}
                        >
                            <LoadingIcon
                                text="Create Tag"
                                isLoading={loading}
                            />
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
