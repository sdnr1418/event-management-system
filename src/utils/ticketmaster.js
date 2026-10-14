const API_KEY = import.meta.env.VITE_TM_API_KEY;
const BASE_URL = "https://app.ticketmaster.com/discovery/v2";

export async function fetchEvents({ keyword = "", category = "", city = "", page = 0 } = {}) {
  const params = new URLSearchParams({
    apikey: API_KEY,
    size: 12,
    page,
    sort: "date,asc",
    countryCode: "US",
  });
  if (keyword) params.append("keyword", keyword);
  if (category) params.append("classificationName", category);
  if (city) params.append("city", city);

  const res = await fetch(`${BASE_URL}/events.json?${params}`);
  if (!res.ok) throw new Error("Failed to fetch events");
  const data = await res.json();

  const list = data._embedded?.events ?? [];
  const totalPages = data.page?.totalPages ?? 0;
  const currentPage = data.page?.number ?? 0;
  return { list, totalPages, currentPage };
}

export async function fetchEventById(id) {
  const res = await fetch(`${BASE_URL}/events/${id}.json?apikey=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
}

export async function fetchCategories() {
  const params = new URLSearchParams({ apikey: API_KEY, size: 10 });
  const res = await fetch(`${BASE_URL}/classifications.json?${params}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data._embedded?.classifications ?? [];
}