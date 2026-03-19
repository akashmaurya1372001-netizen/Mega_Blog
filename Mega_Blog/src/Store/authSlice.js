import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
  status: false,
  userDate: null
}

const authSlice = createSlice({
  name: "auth",
  initialstate,
  reducer: {
    login: (State, action) => {
      State.status = true;
      State.userData = action.payload.useData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = action.pay.load.userData;
    },
  },
});
export const { login, logout } = authSlice.actions;
