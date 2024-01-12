import { Link } from "react-router-dom";

export default function TopBar () {
    return(
        <div className="top-bar d-flex">
            <h2>Store</h2>
            <Link to="/" className="register-nav anchor">
                Go To Web Site
            </Link>
        </div>
    );
}