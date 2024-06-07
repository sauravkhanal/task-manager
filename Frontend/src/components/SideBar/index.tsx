import { Link } from "react-router-dom";
import CreateTaskButton from "../CreateTaskButton";
import { Button } from "../ui/button";
import { List, Menu, UserCheck, UserRoundSearch } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/authContext";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

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
    const [sheetOpen, setSheetOpen] = useState<boolean>(false);
    return (
        <>
            {isLoggedIn && (
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
            )}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger className="xl:hidden absolute top-4 left-4 z-50">
                    <Menu className="size-6" />
                </SheetTrigger>
                <SheetContent
                    className={`flex flex-col justify-center gap-3 border-r px-2 py-5 ${className} w-fit `}
                    side={"left"}
                    onClick={() => setSheetOpen(false)}
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
                </SheetContent>
            </Sheet>
        </>
    );
}
