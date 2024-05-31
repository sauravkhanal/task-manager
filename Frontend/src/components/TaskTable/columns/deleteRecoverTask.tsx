import taskAPI from "@/api/taskAPI";
import { toast } from "sonner";

export async function deleteTask(_id: string, onSuccess: any) {
    const response = await taskAPI.deleteTask(_id);

    if (response.success) {
        toast.success(response.message, {
            action: {
                label: "Undo",
                onClick: () => recoverTask(_id, onSuccess),
            },
        });
        onSuccess({ tasks: true });
    } else {
        toast.error(response.message);
    }
}
export async function recoverTask(_id: string, onSuccess: any) {
    const response = await taskAPI.recoverTask(_id);
    if (response.success) {
        toast.success(response.message);
        onSuccess({ tasks: true });
    } else {
        toast.error(response.message);
    }
}
