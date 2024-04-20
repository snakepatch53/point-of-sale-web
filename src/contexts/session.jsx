import { createContext, useEffect, useState } from "react";
import { existSession, login, logout } from "../services/users";

export const SessionContext = createContext();

export function SessionProvider({ children }) {
    const [progress, setProgress] = useState(false); // [1]
    const [session, setSession] = useState(null);
    const updateSession = (data) => {
        setSession(data);
        window.localStorage.setItem("session", JSON.stringify(data));
    };

    const removeSession = () => {
        setSession([]);
        window.localStorage.removeItem("session");
    };

    const _logout = () => {
        setProgress(true);
        logout().then(() => {
            setProgress(false);
            removeSession();
        });
    };

    const _login = ({ email, password }) => {
        const promise = new Promise((resolve) => {
            const values = { email, password };
            setProgress(true);
            login({ data: values }).then((res) => {
                setProgress(false);
                if (res?.success) updateSession(res.data);
                resolve(res);
            });
        });
        return promise;
    };

    useEffect(() => {
        // temporal
        window.localStorage.setItem(
            "session",
            JSON.stringify({
                id: 1,
                token: "123",
                name: "Harold Hernández",
                role: "Administrador",
            })
        );

        const session_str = window.localStorage.getItem("session");
        if (!session_str) return setSession([]);
        const _session = JSON.parse(session_str);
        setSession(_session);
        checkSession({ _session }).then((res) => {
            if (!res) removeSession();
        });
    }, []); // eslint-disable-line

    const checkSession = async ({ _session }) => {
        if (!_session) return;
        if (!_session?.token) return;
        // const response = await existSession();
        // if (!response?.success) return false;
        return true;
    };

    return (
        <SessionContext.Provider
            value={{
                progress,
                session,
                updateSession,
                logout: _logout,
                login: _login,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}
