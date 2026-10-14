import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../store/eventsSlice";
import { fetchCategories } from "../utils/ticketmaster";
import "./SearchFilters.css";

function SearchFilters() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.events.categories);

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [city, setCity] = useState(searchParams.get("city") || "");

  // fetch categories once on mount
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories()
        .then((data) => dispatch(setCategories(data)))
        .catch(() => {});
    }
  }, [categories.length, dispatch]);

  // debounce keyword: wait 500ms after user stops typing before navigating
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(
        `/events?keyword=${keyword}&category=${category}&city=${city}&page=0`
      );
    }, 500);
    return () => clearTimeout(timer); // cleanup from the useEffect cleanup slide
  }, [keyword, category, city, navigate]);

  return (
    <div className="search-filters">
      <input
        type="text"
        placeholder="Search events..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.segment?.name}>
            {cat.segment?.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
    </div>
  );
}

export default SearchFilters;