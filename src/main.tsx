/* eslint-disable prettier/prettier */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";
import { AppContextProvider } from "./context.tsx";
import QueryProvider from "./requests/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <QueryProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </QueryProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
