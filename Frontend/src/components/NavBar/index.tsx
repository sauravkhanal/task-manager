import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import Icon from "./Icon";
import { IClassName } from "@/types";
// import ScreenSizeIndicator from "@/utils/screenSizeIndicator";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

export default function NavBar({ className }: IClassName) {
    const { logout, isLoggedIn } = useContext(AuthContext);

    return (
        <div
            className={`h-14 w-full shadow-md flex justify-end gap-5 items-center ${className}  top-0 z-10 sticky bg-background dark:border-b`}
        >
            {/* <ScreenSizeIndicator /> */}
            <Icon />
            {!isLoggedIn ? (
                <NotLoggedInContent />
            ) : (
                <LoggedInContent logout={logout} />
            )}
            <ModeToggle />
        </div>
    );
}

function LoggedInContent({ logout }: { logout: () => void }) {
    return (
        <>
            <Link to={"/"} title="logout">
                <Button variant={"outline"} onClick={logout}>
                    Log out
                </Button>
            </Link>
        </>
    );
}

function NotLoggedInContent() {
    return (
        <>
            <Link to={"login"} title="Login">
                <Button variant={"outline"}>Login</Button>
            </Link>
            <Link to={"register"} title="Create an account">
                <Button variant={"outline"}>Register</Button>
            </Link>
        </>
    );
}
