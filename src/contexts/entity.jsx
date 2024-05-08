import { createContext, useEffect, useState } from "react";
// import { getInfo } from "../services/info";
import { useParams } from "react-router-dom";
import { findEntity } from "../services/entity";

export const EntityContext = createContext();

export function EntityProvider({ children }) {
    const { entityName } = useParams();
    const pathname = entityName;

    const [entity, setEntity] = useState(null);

    useEffect(() => {
        findEntity(pathname).then((data) => {
            if (data) return setEntity(data);
            setEntity({});
        });
    }, [pathname]);

    return (
        <EntityContext.Provider
            value={{
                entity: entity,
            }}
        >
            {children}
        </EntityContext.Provider>
    );
}
