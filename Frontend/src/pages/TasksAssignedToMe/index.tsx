import BoardView from "@/BoardView";
import useDataContext from "@/context/dataContext";

export default function TasksAssignedToMe() {
    const { tasksAssignedToMe, loading } = useDataContext();
    return <BoardView taskGroup={tasksAssignedToMe} loading={loading} />;
}
