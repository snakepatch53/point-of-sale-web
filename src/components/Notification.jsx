import "react-notifications-component/dist/theme.css";
import { ReactNotifications, Store } from "react-notifications-component";

export function Notification() {
    return <ReactNotifications />;
}

export function showNotification({
    title,
    message,
    type = "success",
    duration = 5000,
    posHorizontal = "right",
    posVertical = "bottom",
}) {
    Store.addNotification({
        title,
        message,
        type,
        insert: posVertical,
        container: posVertical + "-" + posHorizontal,
        // insert: "top",
        // container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration,
            onScreen: true,
        },
    });
}
