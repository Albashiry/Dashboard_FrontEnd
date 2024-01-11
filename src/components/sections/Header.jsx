import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav className="navbar d-flex shadow">
            <div className="d-flex">
                <Link to="/" className="anchor">Home</Link>
                <Link to="/about" className="anchor">About</Link>
            </div>

            <div className="d-flex">
                {/* check if user stored in localStorage is registered */}

                <Link to="/register" className="register-nav anchor" type="submit" value="register">
                    Register
                </Link>
                <Link to="/login" className="register-nav anchor" type="submit" value="register">
                    Login
                </Link>
                <Link to="/dashboard" className="register-nav anchor" type="submit" value="register">
                    Dashboard
                </Link>

                {/* <Link to="/login" className="register-nav anchor" onClick={handleLogout}>Logout</Link>} */}
            </div>
        </nav>
    );
}
export default Header;