import { configureStore } from "@reduxjs/toolkit";
import { authReducer, getUserAction } from "./auth";
import { ENV } from "@/config";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: ENV === "development",
  //   middleware: [],
});

store.dispatch(getUserAction());
