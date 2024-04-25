import { createContext, useEffect, useState } from "react";

export const SidebarContext = createContext();

export function SidebarProvider({ children }) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleOpen = () => {
        const newIsOpen = !isOpen;
        setIsOpen(newIsOpen);
        localStorage.setItem("sidebarOpen", newIsOpen);
    };

    useEffect(() => {
        const sidebarOpen = localStorage.getItem("sidebarOpen");
        if (sidebarOpen === "false") {
            setIsOpen(false);
        }
    }, []);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggleOpen,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}
