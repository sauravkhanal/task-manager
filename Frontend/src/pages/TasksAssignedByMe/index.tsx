import BoardView from "@/BoardView";
import useDataContext from "@/context/dataContext";

export default function TasksAssignedByMe() {
    const { tasksAssignedByMe, loading } = useDataContext();
    return <BoardView taskGroup={tasksAssignedByMe} loading={loading} />;
}
