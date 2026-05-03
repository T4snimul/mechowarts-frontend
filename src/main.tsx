import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/dashboard" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/auth">
          <Route index element={<Auth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
