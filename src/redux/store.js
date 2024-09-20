import { combineReducers, configureStore } from "@reduxjs/toolkit";
import blogSlice from "@/redux/Blogslice";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import Updateslice from "./Updateslice";
const createNoopStorage = () => {
   return {
     getItem(_key) {
       return Promise.resolve(null);
     },
     setItem(_key, value) {
       return Promise.resolve(value);
     },
     removeItem(_key) {
       return Promise.resolve();
     },
   };
};
const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const persistConfig = {
  key: "root",
  storage
};
const rootReducer = persistReducer(
  persistConfig,
  combineReducers({
    blogReducer: blogSlice,
    updateReducer:Updateslice,
  })
);
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
