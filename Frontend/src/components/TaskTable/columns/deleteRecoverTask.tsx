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
        onSuccess({
            tasks: true,
            tasksAssignedByMe: true,
            tasksAssignedToMe: true,
        });
    } else {
        toast.error(response.message);
    }
}
export async function recoverTask(_id: string, onSuccess: any) {
    const response = await taskAPI.recoverTask(_id);
    if (response.success) {
        toast.success(response.message);
        onSuccess({
            tasks: true,
            tasksAssignedByMe: true,
            tasksAssignedToMe: true,
        });
    } else {
        toast.error(response.message);
    }
}

//Todo: update data locally ( deletion and recovery)
// deletion: need to set deleted field to true,
// approach1: while rendering data, only show data with deleted: false
// approach2: remove data as whole from the state
// approach3: remove the workflow stage filed, ( so data will not be visible in kanban)
//    for data in tasks use approach1

// also need logic to recover deleted task ie: add new task ( can be reused in create task )
