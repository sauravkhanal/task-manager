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
