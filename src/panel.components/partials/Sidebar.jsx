import { faBagShopping, faCartShopping, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../../contexts/session";
import { cls } from "../../lib/utils";
import { InfoContext } from "../../contexts/info";
import { motion } from "framer-motion";
import { SidebarContext } from "../../contexts/sidebar";

export default function Sidebar() {
    const { session } = useContext(SessionContext);
    const { info } = useContext(InfoContext);
    const { isOpen: IsOpenSidebar } = useContext(SidebarContext);

    return (
        <div
            className={cls(
                "panel-sidebar-component fixed z-[500] left-0 flex flex-col items-center w-[200px] min-w-[200px] h-full p-[10px] border-r overflow-y-auto overflow-x-hidden bg-[--c4] backdrop-blur-md shadow-lg",
                "sm:relative sm:z-10 sm:left-auto sm:bg-[--c3] sm:backdrop-blur-none sm:shadow-none ",
                {
                    "w-[50px] min-w-[50px] ": !IsOpenSidebar,
                    "-left-full ": !IsOpenSidebar,
                }
            )}
        >
            {IsOpenSidebar && (
                <img
                    src={info.logo_url}
                    alt={"Foto del usuario " + session.name}
                    className="bg-[--c3-txt] block w-full max-w-[150px] h-auto aspect-video my-[10px] mx-0 rounded object-contain object-center p-2"
                />
            )}
            {!IsOpenSidebar && (
                <motion.div
                    initial={{ opacity: 0, maxHeight: 0, maxWidth: 0 }}
                    animate={{ opacity: 1, maxHeight: 150, maxWidth: 150 }}
                    transition={{ duration: 0.1, delay: 0.1 }}
                >
                    <img
                        src={info.icon_url}
                        alt={"Foto del usuario " + session.name}
                        className="bg-white block w-full max-w-[150px] h-auto aspect-square my-[10px] mx-0 rounded-full object-contain object-center p-[2px]"
                    />
                </motion.div>
            )}
            <span className="block w-full text-nowrap overflow-hidden text-ellipsis text-center text-[var(--c3-txt)]">
                {session.name}
            </span>
            <span className=" block w-full min-h-[30px] text-center text-[--c3-txt3]  text-sm text-nowrap text-ellipsis overflow-hidden">
                {session.role}
            </span>
            <Option name="Inicio" icon={faHome} to="./home" />
            <Option name="Perfil" icon={faUser} to="./profile" />
            <Option name="Tienda" icon={faBagShopping} to="./shop" />
            <Option name="Pedidos" icon={faCartShopping} to="./orders" />
            {/* <AdminOptions>
                <Option name="Usuarios" icon={faUsers} to="./users" />
                <Option name="Negocios" icon={faStore} to="./business" />
            </AdminOptions>
            <SellerOptions>
                <Option name="Categorias" icon={faLayerGroup} to="./categories" />
            </SellerOptions> */}
        </div>
    );
}

function Option({ name, icon, to }) {
    const { pathname } = useLocation();
    const pathnameWithoutPanel = pathname.replace("./", "");
    const isActive = pathnameWithoutPanel === to.replace(".", "");
    const { isOpen: IsOpenSidebar } = useContext(SidebarContext);
    return (
        <Link
            className={cls(
                "group option flex items-center gap-2 w-full h-[30px] min-h-[30px] my-[1px] mx-0 py-5 px-2 text-[--c3-txt] text-base rounded-sm transiton hover:bg-[--c3] hover:scale-105 ",
                {
                    "bg-[--c3]": isActive,
                }
            )}
            to={to}
        >
            <FontAwesomeIcon className="text-sm" icon={icon} />
            <span
                className={cls(
                    "flex-1 block text-nowrap text-ellipsis overflow-hidden opacity-1 ",
                    {
                        "w-0 p-0 opacity-0 ": !IsOpenSidebar,
                    }
                )}
            >
                {name}
            </span>
        </Link>
    );
}
