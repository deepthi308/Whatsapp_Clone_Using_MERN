import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
});

// Configuring Store
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
