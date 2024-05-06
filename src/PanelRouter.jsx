import "./RouterPanel.css";

import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useContext } from "react";
import Header from "./panel.components/partials/Header";
import Sidebar from "./panel.components/partials/Sidebar";
import { SessionContext } from "./contexts/session";
import Loading from "./components/Loading";
import CrudProgress from "./panel.components/crud/CrudProgress";

const Home = lazy(() => import("./panel.pages/Home"));
const Users = lazy(() => import("./panel.pages/Users"));
const Lockers = lazy(() => import("./panel.pages/Lockers"));
const Supliers = lazy(() => import("./panel.pages/Suppliers"));
const Clients = lazy(() => import("./panel.pages/Clients"));
const ProductBuys = lazy(() => import("./panel.pages/ProductBuys"));
const ProductSales = lazy(() => import("./panel.pages/ProductSales"));
// const Products = lazy(() => import("./panel.pages/Products"));

export default function PanelRouter() {
    const { progress } = useContext(SessionContext);

    return (
        <>
            <div className="panel-page">
                <Header />
                <div className="panel-page-content">
                    <Sidebar />
                    <div className="panel-page-page scroll-style relative" id="main-content">
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/lockers" element={<Lockers />} />
                                <Route path="/supliers" element={<Supliers />} />
                                <Route path="/clients" element={<Clients />} />
                                <Route path="/productBuys" element={<ProductBuys />} />
                                <Route path="/productSales" element={<ProductSales />} />
                            </Routes>
                        </Suspense>
                    </div>
                </div>
            </div>
            <CrudProgress isOpen={progress} text="Cerrando sesion..." />
        </>
    );
}
