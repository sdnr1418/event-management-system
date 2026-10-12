import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div>
      <h2>404 - Page not found</h2>
      <Link to="/events">Back to events</Link>
    </div>
  );
}
export default NotFound;