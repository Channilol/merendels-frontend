import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";
import categoryReducer from "../reducers/categoryReducer";

const mainReducer = combineReducers({ userReducer, categoryReducer });

const store = configureStore({
  reducer: mainReducer,
});

export default store;
