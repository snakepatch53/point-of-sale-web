import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { InfoProvider } from "./contexts/info.jsx";
import { SessionProvider } from "./contexts/session.jsx";
import "./index.css";
import "./theme.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <InfoProvider>
        <SessionProvider>
            <App />
        </SessionProvider>
    </InfoProvider>
);
