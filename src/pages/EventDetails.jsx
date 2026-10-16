import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEvent, setLoading, setError } from "../store/eventsSlice";
import { fetchEventById } from "../utils/ticketmaster";
import { registerForEvent, cancelRegistration } from "../store/registrationsSlice";
import "./EventDetails.css";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const event = useSelector((state) => state.events.selectedEvent);
  const loading = useSelector((state) => state.events.loading);
  const error = useSelector((state) => state.events.error);
  const currentUser = useSelector((state) => state.auth.currentUser);
  const registrations = useSelector((state) => state.registrations);
  const isRegistered = currentUser
  ? registrations.some(
      (r) => r.userEmail === currentUser.email && r.event.id === event?.id
    )
  : false;

  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    dispatch(setLoading(true));
    fetchEventById(id)
      .then((data) => {
        dispatch(setSelectedEvent(data));
        dispatch(setLoading(false));
      })
      .catch((err) => dispatch(setError(err.message)));
  }, [id, dispatch]);

  if (loading) return <div className="status-box">Loading event...</div>;
  if (error) return <div className="status-box error">Error: {error}</div>;
  if (!event) return null;

  const image = event.images?.find((img) => img.ratio === "16_9" && img.width > 500)
    || event.images?.[0];
  const venue = event._embedded?.venues?.[0];
  const date = event.dates?.start?.localDate;
  const time = event.dates?.start?.localTime;
  const category = event.classifications?.[0]?.segment?.name;
  const ticketUrl = event.url;

  return (
          <div className="event-actions">
        {ticketUrl && (
          <a href={ticketUrl} target="_blank" rel="noreferrer">
            <button className="btn-register">Buy Tickets</button>
          </a>
        )}
        {currentUser ? (
          isRegistered ? (
            <button
              className="btn-cancel"
              onClick={() => {
                dispatch(cancelRegistration({
                  userEmail: currentUser.email,
                  eventId: event.id,
                }));
                setFeedback("✅ Registration cancelled");
              }}
            >
              Cancel Registration
            </button>
          ) : (
            <button
              className="btn-register"
              onClick={() => {
                dispatch(registerForEvent({
                  userEmail: currentUser.email,
                  event,
                }));
                setFeedback("✅ Successfully registered!");
              }}
            >
              Register for Event
            </button>
          )
        ) : (
          <button className="btn-back" onClick={() => navigate("/login")}>
            Log in to Register
          </button>
        )}
      </div>
  );
}

export default EventDetails;
