import { NavLink } from "react-router-dom";

export default function SideBar  () {

    return (
        <div className="side-bar shadow">
            <NavLink to="/dashboard/users" className="link-item">
                <i className="fa-solid fa-users-line"></i> Show Users
            </NavLink>
            <NavLink to="/dashboard/user/create" className="link-item">
                <i className="fa-solid fa-user-plus"></i> New User
            </NavLink>

            <NavLink to="/dashboard/products" className="link-item">
                <i className="fa-brands fa-product-hunt"></i> Products
            </NavLink>
            <NavLink to="/dashboard/product/create" className="link-item">
                <i className="fa-solid fa-plus"></i> New Products
            </NavLink>
        </div>
    );
}