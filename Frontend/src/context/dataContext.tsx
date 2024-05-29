import { createContext, useContext, useEffect, useState } from "react";
import { ITag, ITask, IUserDetails } from "@/types";
import tagAPI from "@/api/tagAPI";
import userAPI from "@/api/userAPI";
import taskAPI from "@/api/taskAPI";

interface IDataContext {
    allUserDetails: IUserDetails[];
    tags: ITag[];
    tasks: ITask[];
    refreshData: (options?: {
        users?: boolean;
        tags?: boolean;
        tasks?: boolean;
    }) => void;
    loading: boolean;
}

export const DataContext = createContext<IDataContext>({
    allUserDetails: [],
    tags: [],
    tasks: [],
    refreshData: () => {},
    loading: false,
});

function useDataFetching() {
    const [loading, setLoading] = useState<boolean>(false);
    const [allUserDetails, setAllUserDetails] = useState<IUserDetails[]>([]);
    const [tags, setTags] = useState<ITag[]>([]);
    const [tasks, setTasks] = useState<ITask[]>([]);

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
    }): Promise<void> {
        const { users = true, tags = true, tasks = true } = options || {};
        try {
            setLoading(true);
            await Promise.all([
                users ? refreshUsers() : Promise.resolve(),
                tags ? refreshTags() : Promise.resolve(),
                tasks ? refreshTasks() : Promise.resolve(),
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
    };
}

export function DataProvider({ children }: { children: React.ReactNode }) {
    const { loading, allUserDetails, tags, tasks, refreshData } =
        useDataFetching();

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                allUserDetails,
                tags,
                tasks,
                refreshData,
                loading,
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
