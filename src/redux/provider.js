"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/redux/store"; // Correct the spelling of `persistor`
import { PersistGate } from "redux-persist/integration/react";

export const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
