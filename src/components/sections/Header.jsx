import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";


const Header = () => {
  const cookie = new Cookies();
  const token = cookie.get("Bearer");

  async function handleLogout() {
    await axios.post('http://127.0.0.1:8000/api/logout', null, {
      headers: {
        Authorization: "Bearer " + token
      }
    });
    cookie.remove('Bearer');
    window.location.pathname = '/';
  }
  return (
    <nav className="navbar d-flex shadow">
      <div className="d-flex">
        <Link to="/" className="anchor">Home</Link>
        <Link to="/about" className="anchor">About</Link>
      </div>

      <div className="d-flex">
        {!token ?
          <>
            <Link to="/register" className="register-nav anchor" type="submit" value="register">
              Register
            </Link>
            <Link to="/login" className="register-nav anchor" type="submit" value="register">
              Login
            </Link>
          </>
          :
          <>
            <Link to="/dashboard" className="register-nav anchor" type="submit" value="register">
              Dashboard
            </Link>
            <Link to="/login" className="register-nav anchor" onClick={handleLogout}>
              Logout
            </Link>
          </>
        }
      </div>
    </nav>
  );
}
export default Header;