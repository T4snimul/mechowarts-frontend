import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import { RouteProvider } from "@/providers/router-provider";
import { ThemeProvider } from "@/providers/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RouteProvider>
        <ThemeProvider>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/dashboard" element={<App />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </RouteProvider>
    </BrowserRouter>
  </StrictMode>,
);
