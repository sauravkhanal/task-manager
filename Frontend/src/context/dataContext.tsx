import { createContext, useEffect, useState } from "react";
import { ITag, IUserDetails } from "@/types";
import local from "@/utils/localStorage";
import tagAPI from "@/api/tagAPI";
import userAPI from "@/api/userAPI";

interface IDataContext {
    allUserDetails: IUserDetails[];
    tags: ITag[];
    refreshData: () => void;
    loading: Boolean;
}

export const DataContext = createContext<IDataContext>({
    allUserDetails: [],
    tags: [],
    refreshData: () => {},
    loading: false,
});

export default function DataProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState<Boolean>(false);
    const [allUserDetails, setAllUserDetails] = useState<IUserDetails[] | []>(
        local.getJSON("allUserDetails"),
    );
    const [tags, setTags] = useState<ITag[] | []>(local.getJSON("tags"));

    async function refreshUsers() {
        const data = await userAPI.getAllUsers();
        if (data) setAllUserDetails(data.data);
    }

    async function refreshTags() {
        const data = await tagAPI.getAllTags();
        if (data) setTags(data.data);
    }

    async function refreshData() {
        try {
            setLoading(true);
            await Promise.all([refreshUsers(), refreshTags()]);
        } catch (error) {
            console.log("can't refresh: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshData();
    }, []);

    return (
        <DataContext.Provider
            value={{
                allUserDetails,
                tags,
                refreshData,
                loading,
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
