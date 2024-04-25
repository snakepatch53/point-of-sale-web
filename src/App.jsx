import { Suspense, lazy } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notification } from "./components/Notification";
import AuthGuard from "./guards/AuthGuard";
import SessionOutGuard from "./guards/SessionOutGuard";
import PanelRouter from "./PanelRouter";
import { SidebarProvider } from "./contexts/sidebar";

const Login = lazy(() => import("./views/Login"));

function App() {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Notification />
                <Routes>
                    <Route element={<SessionOutGuard />}>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                    </Route>
                    <Route element={<AuthGuard />}>
                        <Route
                            path="/*"
                            element={
                                <SidebarProvider>
                                    <PanelRouter />
                                </SidebarProvider>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}

export default App;
