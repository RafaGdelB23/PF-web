import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./public/styles/index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);