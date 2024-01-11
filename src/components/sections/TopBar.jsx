import { Link } from "react-router-dom";

const TopBar = () => {
    return(
        <div className="top-bar d-flex">
            <h2>Store</h2>
            <Link to="/" className="register-nav anchor">
                Go To Web Site
            </Link>
        </div>
    );
}
export default TopBar;