import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ModalContextProvider from "./providers/ModalProvider.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";
import { queryClient } from "./lib/queryClient.ts";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalContextProvider>
          <App />
        </ModalContextProvider>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
