import { Navigate, Route, Routes } from "react-router-dom"
import { Login } from "../pages/login"

export const NotLoggedInRoutes = () => {
    return(
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to={"/login"} />} />
            <Route path="/posts" element={<Navigate to={"/login"} />} />
        </Routes>
    )
}