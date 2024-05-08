import { Suspense } from "react";
import "./App.css";
import Loading from "./components/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Notification } from "./components/Notification";
// import AuthGuard from "./guards/AuthGuard";
// import SessionOutGuard from "./guards/SessionOutGuard";
import Home from "./views/Home";
import ClientApp from "./ClientApp";
// import { SidebarProvider } from "./contexts/sidebar";

// const Login = lazy(() => import("./views/Login"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <BrowserRouter>
                <Notification />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/:entityName/*" element={<ClientApp />} />

                    {/* <Route element={<AuthGuard />}>
                        <Route
                            path="/*"
                            element={
                                <SidebarProvider>
                                    <PanelRouter />
                                </SidebarProvider>
                            }
                        />
                    </Route> */}
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
