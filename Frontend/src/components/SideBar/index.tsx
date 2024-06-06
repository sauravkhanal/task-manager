import { Link } from "react-router-dom";
import CreateTaskButton from "../CreateTaskButton";
import { Button } from "../ui/button";
import { List, UserCheck, UserRoundSearch } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";

function NavLink({
    to,
    icon: Icon,
    children,
}: {
    to: string;
    icon?: React.ElementType;
    children: React.ReactNode;
}) {
    return (
        <Link to={to}>
            <Button variant="nav" className="w-full">
                {Icon && <Icon className="mr-2 size-6" />}
                {children}
            </Button>
        </Link>
    );
}

export default function SideBar({ className }: { className: string }) {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        isLoggedIn && (
            <div
                className={`flex flex-col  gap-3 border-r px-2 py-5 ${className} hidden xl:flex`}
            >
                <CreateTaskButton />
                <NavLink to="all-tasks" icon={List}>
                    All tasks
                </NavLink>
                <NavLink to="assigned-to-me" icon={UserCheck}>
                    Assigned To Me
                </NavLink>
                <NavLink to="assigned-by-me" icon={UserRoundSearch}>
                    Created By Me
                </NavLink>
            </div>
        )
    );
}
