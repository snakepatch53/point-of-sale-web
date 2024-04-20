import "./RouterPanel.css";

import { Route, Routes } from "react-router-dom";
import Header from "./panel.components/Header";
import { Suspense, lazy, useContext, useState } from "react";
import Sidebar from "./panel.components/Sidebar";
import CrudProgress from "./panel.components/CrudProgress";
import { SessionContext } from "./contexts/session";
import Loading from "./components/Loading";

const Home = lazy(() => import("./panel.pages/Home"));
const Profile = lazy(() => import("./panel.pages/Profile"));
// const Products = lazy(() => import("./panel.pages/Products"));

export default function PanelRouter() {
    const { progress } = useContext(SessionContext);

    const [showSidebar, setShowSidebar] = useState("open");
    const handleClickShowSidebar = () => {
        setShowSidebar(showSidebar == "open" ? "close" : "open");
    };

    return (
        <>
            <div className="panel-page">
                <div className={"panel-page-state " + showSidebar}></div>
                <Header onClickButtonBars={handleClickShowSidebar} />

                <div className="panel-page-content">
                    <Sidebar />
                    <div className="panel-page-page scroll-style relative" id="main-content">
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
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
