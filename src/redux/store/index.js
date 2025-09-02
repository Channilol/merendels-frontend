import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

const mainReducer = combineReducers({ userReducer });

const store = configureStore({
  reducer: mainReducer,
});

export default store;
