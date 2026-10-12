import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/events" className="logo">EventHub</Link>
      <div className="nav-links">
        <Link to="/events">Events</Link>
        <Link to="/my-events">My Events</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </nav>
  );
}
export default Navbar;