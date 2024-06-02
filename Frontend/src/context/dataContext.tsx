import { createContext, useContext, useEffect, useState } from "react";
import {
    ITasksGroupedByWorkFlowStage,
    ITag,
    ITaskWithDetails,
    IUserDetails,
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
            const data = await taskAPI.getAllTasks();
            if (data) setTasks(data.data);
        } catch (error) {
            console.log("can't refresh tasks: ", error);
        } finally {
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
            users = true,
            tags = true,
            tasks = true,
            tasksAssignedByMe = true,
            tasksAssignedToMe = true,
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

    return {
        loading,
        allUserDetails,
        tags,
        tasks,
        refreshData,
        tasksAssignedToMe,
        tasksAssignedByMe,
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
    } = useDataFetching();
    const { isLoggedIn } = useContext(AuthContext);
    useEffect(() => {
        if (isLoggedIn) refreshData();
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
