import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";

export default function NavBar() {
    return (
        <div className="h-14 shadow-sm flex justify-around items-center">
            <Button variant={"outline"}>
                <Link to={"Login"} title="Login">
                    Login
                </Link>
            </Button>
            <Button variant={"outline"}>
                <Link to={"Register"} title="Create an account">
                    Register
                </Link>
            </Button>
            <ModeToggle />
        </div>
    );
}
