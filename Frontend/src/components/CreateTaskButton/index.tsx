import { useModal } from "@/context/modalContext";
import CreateTask from "../CreateTask";
import { Button } from "../ui/button";
import { ClipboardPlus } from "lucide-react";

export default function CreateTaskButton() {
    const { showModal } = useModal();
    return (
        <Button
            variant="nav"
            onClick={() => showModal(<CreateTask mode="create" />)}
        >
            <ClipboardPlus className="size-6 mr-2" />
            Create Task
        </Button>
    );
}
