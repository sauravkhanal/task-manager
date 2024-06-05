import ListView from "@/components/TableView";
import useDataContext from "@/context/dataContext";

export default function Dashboard() {
    const { tasks } = useDataContext();
    return (
        <div className=" h-full flex justify-center px-5 md:px-10">
            <ListView data={tasks} />
        </div>
    );
}
