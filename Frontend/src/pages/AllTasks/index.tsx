import ListView from "@/components/TableView";
import { AuthContext } from "@/context/authContext";
import useDataContext from "@/context/dataContext";
import { useContext } from "react";

export default function AllTasks() {
    const { userDetails } = useContext(AuthContext);
    const isAdmin = userDetails?.role == "ADMIN";
    if (isAdmin) {
        const { tasks } = useDataContext();
        return <ListView data={tasks} />;
    } else {
        return (
            <div className="h-full w-full flex justify-center items-center text-xl">
                Only admin can view all tasks.
            </div>
        );
    }
}
