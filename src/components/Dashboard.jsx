import { Outlet } from "react-router-dom";
import { TopBar, SideBar } from "./sections";

const Dashboard = () => {
    return (
        <div className="dashboard shadow">
            <TopBar />
            <div className="content">
                <SideBar />
                <div className="main">
                    <Outlet /> {/* get component from nested route */}
                </div>
            </div>
        </div>
    );
}
export default Dashboard;