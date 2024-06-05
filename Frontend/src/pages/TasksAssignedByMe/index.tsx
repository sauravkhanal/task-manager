import TaskViewToggleGroup from "@/components/TaskViewToggleGroup";
import useDataContext from "@/context/dataContext";

export default function TasksAssignedByMe() {
    const { tasksAssignedByMe } = useDataContext();

    return (
        <TaskViewToggleGroup tasksGroupedByWorkFlowStages={tasksAssignedByMe} />
    );
}
