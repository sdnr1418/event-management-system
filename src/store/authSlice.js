import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    users: [],          // all "registered accounts" (frontend simulation)
    currentUser: null,  // logged-in user: { name, email }
    error: null,
  },
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const exists = state.users.find((u) => u.email === email);
      if (exists) {
        state.error = "An account with this email already exists";
        return;
      }
      state.users = [...state.users, { name, email, password }];
      state.currentUser = { name, email }; // auto-login after registering
      state.error = null;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        state.error = "Invalid email or password";
        return;
      }
      state.currentUser = { name: user.name, email: user.email };
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearAuthError } =
  authSlice.actions;
export default authSlice.reducer;