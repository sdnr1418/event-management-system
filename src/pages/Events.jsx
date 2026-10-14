import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setLoading, setEvents, setError } from "../store/eventsSlice";
import { fetchEvents } from "../utils/ticketmaster";
import SearchFilters from "../components/SearchFilters";
import "./Events.css";

function Events() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { list, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.events
  );

  const keyword = searchParams.get("keyword") || "";
  const category = searchParams.get("category") || "";
  const city = searchParams.get("city") || "";
  const page = parseInt(searchParams.get("page") || "0");

  useEffect(() => {
    dispatch(setLoading(true));
    fetchEvents({ keyword, category, city, page })
      .then((data) => dispatch(setEvents(data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [keyword, category, city, page, dispatch]);

  return (
    <div className="events-page">
      <h2>Upcoming Events</h2>
      <SearchFilters />

      {loading && <div className="status-box">Loading events...</div>}
      {error && <div className="status-box error">Error: {error}</div>}

      {!loading && !error && list.length === 0 && (
        <div className="status-box">No events found. Try different filters.</div>
      )}

      {!loading && !error && list.length > 0 && (
        <>
          <div className="events-grid">
            {list.map((event) => {
              const image = event.images?.find((img) => img.ratio === "16_9" && img.width > 500)
                || event.images?.[0];
              const venue = event._embedded?.venues?.[0];
              const date = event.dates?.start?.localDate;

              return (
                <div
                  key={event.id}
                  className="event-card"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  {image && <img src={image.url} alt={event.name} />}
                  <div className="event-card-body">
                    <h3>{event.name}</h3>
                    {date && <p className="event-meta">📅 {date}</p>}
                    {venue && (
                      <p className="event-meta">
                        📍 {venue.name}, {venue.city?.name}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pagination">
            <button
              disabled={currentPage === 0}
              onClick={() => navigate(`/events?keyword=${keyword}&category=${category}&city=${city}&page=${currentPage - 1}`)}
            >
              Previous
            </button>
            <span>Page {currentPage + 1} of {totalPages}</span>
            <button
              disabled={currentPage + 1 >= totalPages}
              onClick={() => navigate(`/events?keyword=${keyword}&category=${category}&city=${city}&page=${currentPage + 1}`)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Events;