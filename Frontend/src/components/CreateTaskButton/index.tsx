import { useModal } from "@/context/modalContext";
import CreateTask from "../CreateTask";
import { Button } from "../ui/button";
import { ClipboardPlus } from "lucide-react";

export default function CreateTaskButton() {
    const { showModal } = useModal();
    return (
        <Button onClick={() => showModal(<CreateTask />)}>
            <ClipboardPlus size={16} />
            &nbsp;Add task
        </Button>
    );
}
