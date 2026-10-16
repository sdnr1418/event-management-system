import { createSlice } from "@reduxjs/toolkit";
import { loadFromStorage } from "../utils/storage";

const registrationsSlice = createSlice({
  name: "registrations",
  initialState: loadFromStorage("registrations", []),
  reducers: {
    registerForEvent: (state, action) => {
      const { userEmail, event } = action.payload;
      const alreadyRegistered = state.find(
        (r) => r.userEmail === userEmail && r.event.id === event.id
      );
      if (alreadyRegistered) return;
      return [
        ...state,
        {
          userEmail,
          event: {
            id: event.id,
            name: event.name,
            image: event.images?.find(
              (img) => img.ratio === "16_9" && img.width > 500
            )?.url || event.images?.[0]?.url || null,
            date: event.dates?.start?.localDate || null,
            time: event.dates?.start?.localTime || null,
            venue: event._embedded?.venues?.[0]?.name || null,
            city: event._embedded?.venues?.[0]?.city?.name || null,
            category: event.classifications?.[0]?.segment?.name || null,
            ticketUrl: event.url || null,
          },
          registeredAt: new Date().toISOString(),
        },
      ];
    },
    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;
      return state.filter(
        (r) => !(r.userEmail === userEmail && r.event.id === eventId)
      );
    },
  },
});

export const { registerForEvent, cancelRegistration } =
  registrationsSlice.actions;
export default registrationsSlice.reducer;