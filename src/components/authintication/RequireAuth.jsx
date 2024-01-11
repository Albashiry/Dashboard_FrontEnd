import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { User } from "../context";

const RequireAuth = () => {
    const user = useContext(User);
    const location = useLocation();

    return user.auth.userDetails
        ? <Outlet />
        : <Navigate state={{ from: location }} replace to='/login' />;
}

export default RequireAuth;