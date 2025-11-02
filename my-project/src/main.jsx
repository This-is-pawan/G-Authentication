import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import ContextApi from "./contextApi.jsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
      cacheLocation="localstorage"     // ✅ Persist login across refresh
      useRefreshTokens={true}          // ✅ Use silent token renewal
    >
      <QueryClientProvider client={queryClient}>
        <ContextApi>
          <App />
        </ContextApi>
      </QueryClientProvider>
    </Auth0Provider>
  </BrowserRouter>
);
