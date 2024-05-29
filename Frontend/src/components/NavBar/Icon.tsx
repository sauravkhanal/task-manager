import { GoTasklist } from "react-icons/go";
import { Link } from "react-router-dom";
export default function Icon() {
    return (
        <div className="flex flex-row items-center grow">
            <Link to={"/"} className="flex flex-row items-center">
                <GoTasklist className="text-primary text-4xl" />
                <p className="p-1 font-medium font-robotoCondensed hidden md:inline-block">
                    Task Manager
                </p>
            </Link>
            <span className="grow"></span>
        </div>
    );
}
