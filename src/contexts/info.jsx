import { createContext, useEffect, useState } from "react";
import { getInfo } from "../services/info";

export const InfoContext = createContext();

export function InfoProvider({ children }) {
    const [info, setInfo] = useState({
        name: "",
        logo: "",
        logo_url: "",
        icon: "",
        city: "",
        address: "",
        phone: "",
        cellphone: "",
        email: "",
        tax: "",
    });

    useEffect(() => {
        getInfo().then((data) => {
            setInfo(data);
        });
    }, []);

    window.title = "npi";

    return (
        <InfoContext.Provider
            value={{
                info: info || null,
            }}
        >
            {children}
        </InfoContext.Provider>
    );
}
