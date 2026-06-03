import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }) {
    const isLogged = localStorage.getItem("logged");

    if (!isLogged) {
        return <Navigate to="/" replace />;
    }

    return children
}