import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "../components/Loading";
import { EntityContext } from "../contexts/entity";

export default function EntityExistGuard() {
    const { entity } = useContext(EntityContext);
    if (entity == null) return <Loading />;
    if (entity?.id) return <Outlet />;
    return <Navigate replace to="/" />;
}
