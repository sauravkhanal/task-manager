import { GoTasklist } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Icon() {
    return (
        <Link to={"/"} className="flex flex-row items-center">
            <GoTasklist className="text-primary text-4xl" />
            <p className="p-1 font-medium font-rbCon hidden md:visible">
                Task Manager
            </p>
        </Link>
    );
}
