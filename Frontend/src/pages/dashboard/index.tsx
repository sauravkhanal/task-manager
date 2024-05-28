import CreateTask from "@/components/CreateTask";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { useModal } from "@/context/modalContext";
import { useContext } from "react";

export default function Dashboard() {
    const { userDetails, isLoggedIn } = useContext(AuthContext);
    console.log(isLoggedIn);

    const { showModal } = useModal();

    return (
        <div className=" flex flex-col items-center gap-2 justify-center">
            {isLoggedIn ? (
                <div>is logged in true</div>
            ) : (
                <div>not logged in</div>
            )}
            <div>
                {Object.entries(userDetails || {}).map((value) => (
                    <p key={value.toString()}>
                        {value.toString().replace(",", ": ")}
                    </p>
                ))}
            </div>
            <Button onClick={() => showModal(<CreateTask />)}>
                + create new task
            </Button>
        </div>
    );
}
