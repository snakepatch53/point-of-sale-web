import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SessionContext } from "../context/session";
import Loading from "../pages/Loading";

const ROLE_NAME = "Vendedor";
const ROLE_NAME2 = "Administrador";

export default function SellerGuard() {
    const { session } = useContext(SessionContext);
    if (session == null) return <Loading />;
    if (session?.role == ROLE_NAME || session?.role == ROLE_NAME2) return <Outlet />;
    return <Navigate replace to="./" />;
}

export function SellerOptions({ children }) {
    const { session } = useContext(SessionContext);
    if (session?.role == ROLE_NAME || session?.role == ROLE_NAME2) return children;
    return null;
}
