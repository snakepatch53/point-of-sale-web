import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionContext } from "../contexts/session";
import Loading from "../components/Loading";

export default function AuthGuard() {
    const { session } = useContext(SessionContext);
    if (session == null) return <Loading />;
    if (session?.id) return <Outlet />;
    return <Navigate replace to="./login" />;
}
