import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/context/authContext";
import VerifyOTP from "@/pages/VerifyOTP";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/dashboard";

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
            <Route path="/verify" element={<VerifyOTP />} />
            <Route element={<PreventedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>
        </Routes>
    );
}
