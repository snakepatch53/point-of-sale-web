import "./client.css";
import { SessionContext } from "./contexts/session";
import { Route, Routes } from "react-router-dom";

import { Suspense, lazy, useContext } from "react";
import Header from "./client.components/partials/Header";
import Sidebar from "./client.components/partials/Sidebar";

import Loading from "./components/Loading";
import CrudProgress from "./client.components/crud/CrudProgress";

const Home = lazy(() => import("./client.pages/Home"));
const Users = lazy(() => import("./client.pages/Users"));
const Lockers = lazy(() => import("./client.pages/Lockers"));
const Supliers = lazy(() => import("./client.pages/Suppliers"));
const Clients = lazy(() => import("./client.pages/Clients"));
const Products = lazy(() => import("./client.pages/Products"));
const ProductBuys = lazy(() => import("./client.pages/ProductBuys"));
const ProductSales = lazy(() => import("./client.pages/ProductSales"));

export default function ClientRouter() {
    const { progress } = useContext(SessionContext);
    return (
        <>
            <div className="panel-page">
                <Header />
                <div className="panel-page-content">
                    <Sidebar />
                    <div className="panel-page-page scroll-style flex-1 flex flex-col relative overflow-y-auto items-center gap-[25px] h-full px-[--pdd] ">
                        <Suspense fallback={<Loading />}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/home" element={<Home />} />
                                <Route path="/users" element={<Users />} />
                                <Route path="/lockers" element={<Lockers />} />
                                <Route path="/supliers" element={<Supliers />} />
                                <Route path="/clients" element={<Clients />} />
                                <Route path="/products" element={<Products />} />
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
