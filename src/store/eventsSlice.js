import { createSlice } from "@reduxjs/toolkit";

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    list: [],
    selectedEvent: null,
    categories: [],
    loading: false,
    error: null,
    totalPages: 0,
    currentPage: 0,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setEvents: (state, action) => {
      state.list = action.payload.list;
      state.totalPages = action.payload.totalPages;
      state.currentPage = action.payload.currentPage;
      state.error = null;
    },
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setLoading,
  setEvents,
  setSelectedEvent,
  setCategories,
  setError,
} = eventsSlice.actions;
export default eventsSlice.reducer;