import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../MainPage/Students/slice";

export const store = configureStore({
  reducer: { students: studentReducer },
});
