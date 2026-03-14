import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  isAuthenticated: false,

  users: [
    {
      id: "u1",
      name: "Abubakar Afzal",
      email: "abubakar@campus.edu",
      password: "password123",
      major: "Software Engineering",
    },
    {
      id: "u2",
      name: "Fatima Irfan",
      email: "fatima@campus.edu",
      password: "password123",
      major: "Electrical Engineering",
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => u.email === email && u.password === password,
      );
      if (user) {
        state.currentUser = user;
        state.isAuthenticated = true;
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    register: (state, action) => {
      const newUser = { id: Date.now().toString(), ...action.payload };
      state.users.push(newUser);
      state.currentUser = newUser;
      state.isAuthenticated = true;
    },
    changePassword: (state, action) => {
      if (state.currentUser) {
        state.currentUser.password = action.payload;
        const userIndex = state.users.findIndex(
          (u) => u.id === state.currentUser.id,
        );
        if (userIndex != -1) {
          state.users[userIndex].password = action.payload;
        }
      }
    },
  },
});

export const { login, logout, register, changePassword } = userSlice.actions;
export default userSlice.reducer;
