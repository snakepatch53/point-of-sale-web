import "./Sidebar.css";

import { faBagShopping, faCartShopping, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { SessionContext } from "../contexts/session";
import { cls } from "../lib/utils";
import { InfoContext } from "../contexts/info";
import styled from "styled-components";
import { motion } from "framer-motion";

export default function Sidebar({ isOpen }) {
    const { session } = useContext(SessionContext);
    const { info } = useContext(InfoContext);
    return (
        <PanelSidebarComponent className="panel-sidebar-component  relative z-10 flex flex-col items-center w-[200px] min-w-[200px] h-full p-[10px] border-r overflow-y-auto overflow-x-hidden bg-black/20 ">
            {isOpen && (
                <img
                    src={info.logo_url}
                    alt={"Foto del usuario " + session.name}
                    className="bg-[var(--c3-bg)] block w-full max-w-[150px] h-auto aspect-video my-[10px] mx-0 rounded object-contain object-center p-2"
                />
            )}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, maxHeight: 0, maxWidth: 0 }}
                    animate={{ opacity: 1, maxHeight: 150, maxWidth: 150 }}
                    transition={{ duration: 0.1, delay: 0.1 }}
                >
                    <img
                        src={info.icon_url}
                        alt={"Foto del usuario " + session.name}
                        className="block w-full max-w-[150px] h-auto aspect-square my-[10px] mx-0 rounded object-contain object-center"
                    />
                </motion.div>
            )}
            <span className="text-[var(--c4-txt)]">{session.name}</span>
            <span className="user_name">{session.role}</span>
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
        </PanelSidebarComponent>
    );
}

function Option({ name, icon, to }) {
    const { pathname } = useLocation();
    const pathnameWithoutPanel = pathname.replace("./", "");
    const isActive = pathnameWithoutPanel === to.replace(".", "");
    return (
        <Link
            className={cls(
                "group option flex items-center gap-1 w-full h-[30px] min-h-[30px] my-[1px] mx-0 py-5 px-2 text-[--c4-txt] text-base rounded-sm transiton hover:bg-black/20",
                {
                    "bg-black/20": isActive,
                }
            )}
            to={to}
        >
            <FontAwesomeIcon icon={icon} />
            <span>{name}</span>
        </Link>
    );
}

const PanelSidebarComponent = styled.div`
    & span.user_name {
        display: block;
        width: 100%;
        min-height: 30px;
        text-align: center;
        /* color: var(--info); */
        color: var(--c4-txt2);
        font-size: 15px;
        margin: 0 0 10px 0;
        padding: 0 0 10px 0;
        letter-spacing: 0.2px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        border-bottom: 1px solid rgba(0, 0, 0, 0.5);
    }

    & hr {
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 1px;
    }

    & a.option span {
        flex-grow: 1;
        display: block;
        padding: 0 0 0 5px;
        font-size: 15px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        opacity: 1;
    }

    & a.option.active {
        background: rgba(0, 0, 0, 0.2);
        padding: 0 0 0 20px;
        box-shadow: 12px 0 0px 0 rgba(0, 0, 0, 0.2);
        border-radius: 4px;
    }
`;
