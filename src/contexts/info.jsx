import { createContext, useEffect } from "react";
// import { getInfo } from "../services/info";

import information from "../mocks/info.json";

export const InfoContext = createContext();

export function InfoProvider({ children }) {
    // const [info, setInfo] = useState(null);

    useEffect(() => {
        // getInfo().then((data) => {
        //     setInfo(data);
        // });
    }, []);

    // const { info: information, users, businesses, categories, products } = info || {};

    return (
        <InfoContext.Provider
            value={{
                info: information || null,
                // users: users || null,
                // businesses: businesses || null,
                // categories: categories || null,
                // products: products || null,
            }}
        >
            {children}
        </InfoContext.Provider>
    );
}
