import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { ENV } from "@/config";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: ENV === "development",
  //   middleware: [],
});
