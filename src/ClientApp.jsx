import { SessionProvider } from "./contexts/session";
import { EntityProvider } from "./contexts/entity";
import { SidebarProvider } from "./contexts/sidebar";
import { Route, Routes } from "react-router-dom";
import SessionOutGuard from "./guards/SessionOutGuard";
import AuthGuard from "./guards/AuthGuard";
import { lazy } from "react";
import EntityExistGuard from "./guards/EntityExistGuard";

const Login = lazy(() => import("./client.pages/Login"));
const ClientRouter = lazy(() => import("./ClientRouter"));

export default function ClientApp() {
    return (
        <EntityProvider>
            <SessionProvider>
                <SidebarProvider>
                    <Routes>
                        <Route element={<EntityExistGuard />}>
                            <Route element={<SessionOutGuard />}>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                            </Route>
                            <Route element={<AuthGuard />}>
                                <Route path="/*" element={<ClientRouter />} />
                            </Route>
                        </Route>
                    </Routes>
                </SidebarProvider>
            </SessionProvider>
        </EntityProvider>
    );
}
