import ListView from "@/components/TableView";
import useDataContext from "@/context/dataContext";

export default function AllTasks() {
    const { tasks } = useDataContext();
    return <ListView data={tasks} />;
}
