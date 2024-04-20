import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionContext } from "../context/session";
import Loading from "../pages/Loading";

const ROLE_NAME = "Administrador";

export default function AdminGuard() {
    const { session } = useContext(SessionContext);
    if (session == null) return <Loading />;
    if (session?.role == ROLE_NAME) return <Outlet />;
    return <Navigate replace to="./" />;
}

export function AdminOptions({ children }) {
    const { session } = useContext(SessionContext);
    if (session?.role == ROLE_NAME) return children;
    return null;
}
