import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { voxcheckApiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";

export const makeStore = () => {
  const store = configureStore({
    reducer: {
      [voxcheckApiSlice.reducerPath]: voxcheckApiSlice.reducer,
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(voxcheckApiSlice.middleware),
  });
  setupListeners(store.dispatch);
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
