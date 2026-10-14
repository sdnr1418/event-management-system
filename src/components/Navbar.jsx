import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import "./Navbar.css";

function Navbar() {
  const currentUser = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUser());
    navigate("/login");
  }

  return (
    <nav className="navbar">
      <Link to="/events" className="logo">EventHub</Link>
      <div className="nav-links">
        <Link to="/events">Events</Link>
        {currentUser ? (
          <>
            <Link to="/my-events">My Events</Link>
            <span className="nav-user">Hi, {currentUser.name}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
export default Navbar;
