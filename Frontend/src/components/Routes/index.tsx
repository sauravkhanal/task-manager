import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import VerifyOTP from "@/pages/VerifyOTP";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/dashboard";
import NotFound from "@/pages/404";
import ListView from "@/pages/ListView";
import BoardView from "@/BoardView/KanBanBoard";
import TasksAssignedToMe from "@/pages/TasksAssignedToMe";
import TasksAssignedByMe from "@/pages/TasksAssignedByMe";
import { TaskView } from "../TaskView";

type TRouteProps = {
    isLoggedIn: boolean;
    redirectPath?: string;
};

const ProtectedRoute = ({ isLoggedIn, redirectPath = "/" }: TRouteProps) => {
    if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

const PreventedRoute = ({
    isLoggedIn,
    redirectPath = "/dashboard",
}: TRouteProps) => {
    if (isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
    }
    return <Outlet />;
};

export default function MyRoutes() {
    const { isLoggedIn } = useContext(AuthContext);
    return (
        <Routes>
            <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
            <Route path="/verify/:OTP" element={<VerifyOTP />} />
            <Route path="/verify" element={<VerifyOTP />} />
            <Route element={<PreventedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/list" element={<ListView />} />
                <Route path="/assigned-to-me" element={<TasksAssignedToMe />} />
                <Route path="/assigned-by-me" element={<TasksAssignedByMe />} />
                <Route path="/details/:taskID" element={<TaskView />} />
                <Route path="/details/" element={<TaskView />} />
            </Route>
            <Route path="/*" element={<NotFound />} />
        </Routes>
    );
}
