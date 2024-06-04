import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, X } from "lucide-react";
import LoadingIcon from "@/components/LoadingIcon";
import { useState } from "react";
import taskAPI from "@/api/taskAPI";
import { toast } from "sonner";
import useDataContext from "@/context/dataContext";

type BulkSelectActionProp = {
    className?: string;
    clearSelections?: () => void;
    selectedIDs: string[];
};

export default function BulkSelectActions({
    selectedIDs,
    clearSelections,
    className,
}: BulkSelectActionProp) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { refreshData } = useDataContext();
    async function handleDelete() {
        setIsLoading(true);
        console.log(selectedIDs);
        const response = await taskAPI.bulkDelete(selectedIDs);
        if (response.success) {
            refreshData({ tasks: true });
            clearSelections && clearSelections();
            toast.success(response.message);
        } else {
            toast.error(response.message);
        }
        setIsLoading(false);
    }
    return (
        <Card className={`font-poppins w-fit h-fit ${className} p-2 m-0`}>
            <CardContent className="flex gap-2 items-center m-0 p-0">
                <Button variant="ghost" onClick={clearSelections}>
                    <X />
                </Button>
                <p className="mr-4">{selectedIDs.length} items selected</p>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            <LoadingIcon isLoading={isLoading} color="white">
                                <Trash2 className="size-5" />
                                &nbsp;Delete Tasks
                            </LoadingIcon>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="font-poppins">
                        <AlertDialogHeader>
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will delete
                                all the selected tasks.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/60"
                                onClick={handleDelete}
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    );
}
