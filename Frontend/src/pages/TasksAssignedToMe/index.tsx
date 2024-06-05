import TaskViewToggleGroup from "@/components/TaskViewToggleGroup";
import useDataContext from "@/context/dataContext";

export default function TasksAssignedToMe() {
    const { tasksAssignedToMe } = useDataContext();

    return (
        <TaskViewToggleGroup tasksGroupedByWorkFlowStages={tasksAssignedToMe} />
    );
}
