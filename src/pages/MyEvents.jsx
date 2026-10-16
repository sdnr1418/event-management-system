import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cancelRegistration } from "../store/registrationsSlice";
import "./MyEvents.css";

function MyEvents() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations);

  const myRegistrations = registrations.filter(
    (registration) => registration.userEmail === currentUser?.email
  );
  const today = new Date().toISOString().split("T")[0];
  const upcoming = myRegistrations.filter(
    (registration) => !registration.event.date || registration.event.date >= today
  );
  const completed = myRegistrations.filter(
    (registration) => registration.event.date && registration.event.date < today
  );

  function handleCancel(eventId) {
    if (currentUser) {
      dispatch(cancelRegistration({ userEmail: currentUser.email, eventId }));
    }
  }

  function renderCard(registration, showCancel) {
    const { event } = registration;

    return (
      <div key={event.id} className={`my-event-card ${showCancel ? "" : "completed"}`}>
        {event.image && (
          <img
            src={event.image}
            alt={event.name}
            onClick={() => navigate(`/events/${event.id}`)}
            style={{ cursor: "pointer" }}
          />
        )}
        <div className="my-event-card-body">
          <h4 onClick={() => navigate(`/events/${event.id}`)} style={{ cursor: "pointer" }}>
            {event.name}
          </h4>
          {event.date && <p className="my-event-meta">Date: {event.date}</p>}
          {event.time && <p className="my-event-meta">Time: {event.time}</p>}
          {event.venue && (
            <p className="my-event-meta">
              Venue: {event.venue}{event.city ? `, ${event.city}` : ""}
            </p>
          )}
          {event.category && <p className="my-event-meta">Category: {event.category}</p>}
          {showCancel && (
            <button className="btn-cancel-small" onClick={() => handleCancel(event.id)}>
              Cancel Registration
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="my-events">
      <h2>My Events</h2>

      <h3>Upcoming ({upcoming.length})</h3>
      {upcoming.length === 0 ? (
        <p className="empty-msg">
          No upcoming events. {" "}
          <button className="browse-events" onClick={() => navigate("/events")}>
            Browse events →
          </button>
        </p>
      ) : (
        <div className="my-events-grid">
          {upcoming.map((registration) => renderCard(registration, true))}
        </div>
      )}

      <h3>Completed ({completed.length})</h3>
      {completed.length === 0 ? (
        <p className="empty-msg">No completed events yet.</p>
      ) : (
        <div className="my-events-grid">
          {completed.map((registration) => renderCard(registration, false))}
        </div>
      )}
    </div>
  );
}

export default MyEvents;
