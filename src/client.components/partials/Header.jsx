import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { SessionContext } from "../../contexts/session";
import { EntityContext } from "../../contexts/entity";
import { SidebarContext } from "../../contexts/sidebar";
import { cls } from "../../lib/utils";

export default function Header() {
    const { logout } = useContext(SessionContext);
    const { entity } = useContext(EntityContext);
    const { isOpen: isSidebarOpen, toggleOpen: toggleOpenSidebar } = useContext(SidebarContext);
    return (
        <>
            <div className="panel-page-header fixed top-0 left-0 flex items-center w-full h-[50px] bg-[--c3] z-50">
                <span
                    className={cls(
                        "hidden sm:block w-[200px] max-w-full h-full px-[10px] text-[16px] tracking-[0.7px] text-[--c3-txt2] font-bold whitespace-nowrap text-ellipsis overflow-hidden leading-[3.1] bg-black/20 border border-r border-black/20 text-center",
                        {
                            "w-[50px] ": !isSidebarOpen,
                        }
                    )}
                    style={{
                        textShadow: "0 0 1px var(--c6-txt)",
                    }}
                >
                    {entity.name}
                </span>
                <button
                    className="flex justify-center items-center w-[50px] h-full bg-transparent cursor-pointer hover:bg-black/10"
                    onClick={toggleOpenSidebar}
                >
                    <FontAwesomeIcon icon={faBars} className="text-[1.1rem] text-[--c3-txt]" />
                </button>
                <div className="flex ml-auto mr-2 h-full">
                    <button
                        className="block px-4 whitespace-nowrap text-[--c3-txt] text-sm tracking-wide hover:underline hover:bg-transparent"
                        onClick={logout}
                    >
                        Cerrar sesion
                    </button>
                </div>
            </div>
        </>
    );
}
