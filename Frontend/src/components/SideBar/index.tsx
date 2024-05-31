import { Link } from "react-router-dom";
import CreateTaskButton from "../CreateTaskButton";
import { Button } from "../ui/button";
import { Clipboard, List, UserCheck, UserRoundSearch } from "lucide-react";

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
    return (
        <div className={`flex flex-col  gap-3 border-r px-2 py-5 ${className}`}>
            <CreateTaskButton />
            <NavLink to="" icon={List}>
                List View
            </NavLink>
            <NavLink to="" icon={Clipboard}>
                Board View
            </NavLink>
            <NavLink to="" icon={UserCheck}>
                Assigned To Me
            </NavLink>
            <NavLink to="" icon={UserRoundSearch}>
                Created By Me
            </NavLink>
        </div>
    );
}
