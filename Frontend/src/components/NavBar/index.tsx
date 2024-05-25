import { Link } from "react-router-dom";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import Icon from "./Icon";
import { IClassName } from "@/types";
import ScreenSizeIndicator from "@/utils/screenSizeIndicator";

export default function NavBar({ className }: IClassName) {
    return (
        <div
            className={`h-14 shadow-md flex justify-end gap-5 items-center ${className}`}
        >
            <ScreenSizeIndicator />
            <span className="grow">
                <Icon />
            </span>
            <Link to={"Login"} title="Login">
                <Button variant={"outline"}>Login</Button>
            </Link>
            <Link to={"Register"} title="Create an account">
                <Button variant={"outline"}>Register</Button>
            </Link>
            <ModeToggle />
        </div>
    );
}
