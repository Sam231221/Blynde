import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ModalContextProvider from "./providers/ModalProvider.tsx";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-lazy-load-image-component/src/effects/blur.css";
import store from "./redux/store.ts";
import { queryClient } from "./lib/queryClient.ts";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ModalContextProvider>
          <App />
          <ToastContainer />
        </ModalContextProvider>
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
