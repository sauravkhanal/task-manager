import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import Icon from "./Icon";
import { IClassName } from "@/types";
import ScreenSizeIndicator from "@/utils/screenSizeIndicator";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function NavBar({ className }: IClassName) {
    const { logout, isLoggedIn } = useContext(AuthContext);
    return (
        <div
            className={`h-14 w-full shadow-md flex justify-end gap-5 items-center ${className}  top-0 z-10 sticky bg-background`}
        >
            <ScreenSizeIndicator />
            <span className="grow">
                <Icon />
            </span>
            {!isLoggedIn ? (
                <>
                    <Link to={"Login"} title="Login">
                        <Button variant={"outline"}>Login</Button>
                    </Link>
                    <Link to={"Register"} title="Create an account">
                        <Button variant={"outline"}>Register</Button>
                    </Link>
                </>
            ) : (
                <Link to={"/"} title="logout">
                    <Button variant={"outline"} onClick={logout}>
                        Log out
                    </Button>
                </Link>
            )}
            <ModeToggle />
        </div>
    );
}
