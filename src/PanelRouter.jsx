import "./RouterPanel.css";

import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import Header from "./panel.components/partials/Header";
import Sidebar from "./panel.components/partials/Sidebar";
import { SessionContext } from "./contexts/session";
import Loading from "./components/Loading";
import CrudProgress from "./panel.components/crud/CrudProgress";
import { SidebarContext } from "./contexts/sidebar";

const Home = lazy(() => import("./panel.pages/Home"));
const Profile = lazy(() => import("./panel.pages/Profile"));
// const Products = lazy(() => import("./panel.pages/Products"));

export default function PanelRouter() {
    const { progress } = useContext(SessionContext);
    const { isOpen: IsOpenSidebar } = useContext(SidebarContext);

    return (
        <>
            <div className="panel-page">
                <div className={"panel-page-state " + (!IsOpenSidebar ? "close" : "")}></div>
                <Header />

                <div className="panel-page-content">
                    <Sidebar />
                    <div className="panel-page-page scroll-style relative" id="main-content">
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/profile" element={<Profile />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
            <CrudProgress isOpen={progress} text="Cerrando sesion..." />
        </>
    );
}
