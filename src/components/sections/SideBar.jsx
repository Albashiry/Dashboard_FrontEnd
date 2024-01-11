import { NavLink } from "react-router-dom";

const SideBar = () => {

    return (
        <div className="side-bar shadow">
            <NavLink to="/dashboard/users" className="link-item">
                <i className="fa-solid fa-users-line"></i> Show Users
            </NavLink>
            <NavLink to="/dashboard/user/create" className="link-item">
                <i className="fa-solid fa-user-plus"></i> New User
            </NavLink>
        </div>
    );
}
export default SideBar;