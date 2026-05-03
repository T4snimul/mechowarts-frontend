import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";
import SignupForm from "@/forms/SignupFrom";
import LoginForm from "@/forms/LoginForm";
import OtpForm from "@/forms/OtpForm";
import RollForm from "@/forms/RollForm";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/dashboard" element={<App />}>
          <Route index element={<Dashboard />} />
        </Route>
        <Route path="/auth" element={<Auth />}>
          <Route index element={<RollForm />} />
          <Route path="/auth/signup" element={<SignupForm />} />
          <Route path="/auth/login" element={<LoginForm />} />
          <Route path="/auth/verify" element={<OtpForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
