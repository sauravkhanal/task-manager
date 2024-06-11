import { createContext, useContext, useEffect, useState } from "react";
import {
    ITasksGroupedByWorkFlowStage,
    ITag,
    ITaskWithDetails,
    IUserDetails,
    WorkflowStage,
} from "@/types";
import tagAPI from "@/api/tagAPI";
import userAPI from "@/api/userAPI";
import taskAPI from "@/api/taskAPI";
import { AuthContext } from "./authContext";

interface IDataContext {
    allUserDetails: IUserDetails[];
    tags: ITag[];
    tasks: ITaskWithDetails[];
    tasksAssignedByMe: ITasksGroupedByWorkFlowStage;
    tasksAssignedToMe: ITasksGroupedByWorkFlowStage;
    updateTasksLocally: (newTaskDetail: ITaskWithDetails) => void;
    revertTaskChanges: () => void;
    refreshData: (options?: {
        users?: boolean;
        tags?: boolean;
        tasks?: boolean;
        tasksAssignedByMe?: boolean;
        tasksAssignedToMe?: boolean;
    }) => void;
    loading: boolean;
}

const emptyGroupedData: ITasksGroupedByWorkFlowStage = {
    TODO: [],
    INPROGRESS: [],
    COMPLETED: [],
};

const DataContext = createContext<IDataContext>({
    allUserDetails: [],
    tags: [],
    tasks: [],
    tasksAssignedByMe: emptyGroupedData,
    tasksAssignedToMe: emptyGroupedData,
    refreshData: () => {},
    loading: false,
    updateTasksLocally: () => {},
    revertTaskChanges: () => {},
});

function useDataFetching() {
    const [loading, setLoading] = useState<boolean>(false);
    const [allUserDetails, setAllUserDetails] = useState<IUserDetails[]>([]);
    const [tasksAssignedByMe, setTasksAssignedByMe] =
        useState<ITasksGroupedByWorkFlowStage>(emptyGroupedData);
    const [tasksAssignedToMe, setTasksAssignedToMe] =
        useState<ITasksGroupedByWorkFlowStage>(emptyGroupedData);
    const [tags, setTags] = useState<ITag[]>([]);
    const [tasks, setTasks] = useState<ITaskWithDetails[]>([]);

    async function refreshTasksAssignedByMe() {
        try {
            setLoading(true);
            const data = await taskAPI.getTasksAssignedByMe();
            if (data) setTasksAssignedByMe(data.data);
        } catch (error) {
            console.log("can't refresh tasks assigned by me: ", error);
        } finally {
            setLoading(false);
        }
    }

    async function refreshTasksAssignedToMe() {
        try {
            setLoading(true);
            const data = await taskAPI.getTasksAssignedToMe();
            if (data) setTasksAssignedToMe(data.data);
        } catch (error) {
            console.log("can't refresh tasks assigned to me: ", error);
        } finally {
            setLoading(false);
        }
    }

    async function refreshUsers() {
        try {
            setLoading(true);
            const data = await userAPI.getAllUsers();
            if (data) setAllUserDetails(data.data);
        } catch (error) {
            console.log("can't refresh users: ", error);
        } finally {
            setLoading(false);
        }
    }

    async function refreshTags() {
        try {
            setLoading(true);
            const data = await tagAPI.getAllTags();
            if (data) setTags(data.data);
        } catch (error) {
            console.log("can't refresh tags: ", error);
        } finally {
            setLoading(false);
        }
    }

    async function refreshTasks() {
        try {
            setLoading(true);
            // console.log("all data fetching");
            const data = await taskAPI.getAllTasks();
            if (data) setTasks(data.data);
        } catch (error) {
            console.log("can't refresh tasks: ", error);
        } finally {
            // console.log("finished , setting loading to false");
            setLoading(false);
        }
    }

    async function refreshData(options?: {
        users?: boolean;
        tags?: boolean;
        tasks?: boolean;
        tasksAssignedByMe?: boolean;
        tasksAssignedToMe?: boolean;
    }): Promise<void> {
        const {
            users = false,
            tags = false,
            tasks = false,
            tasksAssignedByMe = false,
            tasksAssignedToMe = false,
        } = options || {};
        try {
            setLoading(true);
            await Promise.all([
                users ? refreshUsers() : Promise.resolve(),
                tags ? refreshTags() : Promise.resolve(),
                tasks ? refreshTasks() : Promise.resolve(),
                tasksAssignedByMe
                    ? refreshTasksAssignedByMe()
                    : Promise.resolve(),
                tasksAssignedToMe
                    ? refreshTasksAssignedToMe()
                    : Promise.resolve(),
            ]);
        } catch (error) {
            console.log("can't refresh data: ", error);
        } finally {
            setLoading(false);
        }
    }

    function updateTasksLocally(newTaskDetail: Partial<ITaskWithDetails>) {
        localStorage.setItem(
            "previousState",
            JSON.stringify({
                tasks,
                tasksAssignedByMe,
                tasksAssignedToMe,
            }),
        );

        setTasks((prev) =>
            prev.map((task) =>
                task._id === newTaskDetail._id
                    ? { ...task, ...newTaskDetail }
                    : task,
            ),
        );

        function updateGroupedTask(
            groupedTask: ITasksGroupedByWorkFlowStage,
            newTaskDetail: Partial<ITaskWithDetails>,
        ): ITasksGroupedByWorkFlowStage {
            const updatedTaskGroup: ITasksGroupedByWorkFlowStage = {
                ...emptyGroupedData,
            };

            let taskPresent = false;
            let foundTask: ITaskWithDetails;
            Object.keys(emptyGroupedData).forEach((stage) => {
                // Filter the current stage to remove the task
                updatedTaskGroup[stage as WorkflowStage] = (
                    groupedTask[stage as WorkflowStage] || []
                ).filter((task) => {
                    if (task._id !== newTaskDetail._id) return true;
                    else {
                        taskPresent = true;
                        foundTask = { ...task };
                        return false;
                    }
                });
            });

            // Add the new task to it's corresponding stage
            if (taskPresent) {
                updatedTaskGroup[newTaskDetail.workflowStage!].push({
                    ...foundTask!,
                    ...newTaskDetail,
                });
            }

            return updatedTaskGroup;
        }

        setTasksAssignedByMe((prev) => updateGroupedTask(prev, newTaskDetail));
        setTasksAssignedToMe((prev) => updateGroupedTask(prev, newTaskDetail));
    }

    function revertTaskChanges() {
        // Roll back to previous state
        const previousState = JSON.parse(
            localStorage.getItem("previousState") || "{}",
        );
        setTasks(previousState.tasks);
        setTasksAssignedByMe(previousState.tasksAssignedByMe);
        setTasksAssignedToMe(previousState.tasksAssignedToMe);
        localStorage.removeItem("previousState");
    }
    return {
        loading,
        allUserDetails,
        tags,
        tasks,
        refreshData,
        tasksAssignedToMe,
        tasksAssignedByMe,
        updateTasksLocally,
        revertTaskChanges,
    };
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    const {
        loading,
        allUserDetails,
        tags,
        tasks,
        refreshData,
        tasksAssignedByMe,
        tasksAssignedToMe,
        updateTasksLocally,
        revertTaskChanges,
    } = useDataFetching();
    const { isLoggedIn, userDetails } = useContext(AuthContext);

    const isAdmin = userDetails?.role == "ADMIN";

    useEffect(() => {
        if (isLoggedIn)
            refreshData({
                users: true,
                tags: true,
                tasks: isAdmin,
                tasksAssignedByMe: true,
                tasksAssignedToMe: true,
            });
    }, [isLoggedIn]);

    return (
        <DataContext.Provider
            value={{
                allUserDetails,
                tags,
                tasks,
                refreshData,
                loading,
                tasksAssignedByMe,
                tasksAssignedToMe,
                updateTasksLocally,
                revertTaskChanges,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}

export default function useDataContext() {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error(
            "The data context can only be used within the Data context provider",
        );
    }
    return context;
}
