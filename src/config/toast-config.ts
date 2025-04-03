import { ToastContainerProps } from "react-toastify";


export const TOAST_CONFIG: ToastContainerProps = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: true,
    theme: "light",
    toastStyle: {
        backgroundColor: "#f9f9f9",
        color: "#333",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "12px",
        fontSize: "14px",
        border: "1px solid #ddd",
    },
};
