import CreateTask from "@/components/CreateTask";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/context/authContext";
import { DataContext } from "@/context/dataContext";
import { useModal } from "@/context/modalContext";
import { useContext } from "react";

export default function Dashboard() {
    const { userDetails, isLoggedIn } = useContext(AuthContext);

    const { showModal } = useModal();
    const { allUserDetails, tags } = useContext(DataContext);

    const print = (data: any) => {
        console.log(data[0]);
        for (const [key, value] of Object.entries(data)) {
            console.log(`${key}: ${value}`);
        }
    };

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
            <Button onClick={() => print(allUserDetails)}>
                All user details
            </Button>
            <Button onClick={() => print(tags)}>all tags</Button>
        </div>
    );
}
