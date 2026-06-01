import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { PlaceholderPage } from "@/pages/Dashboard/PlaceholderPage";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";
import SignupForm from "@/forms/SignupForm";
import LoginForm from "@/forms/LoginForm";
import OtpForm from "@/forms/OtpForm";
import RollForm from "@/forms/RollForm";
import ResetPasswordForm from "@/forms/ResetPasswordForm";
import RouteProvider from "@/providers/RouteProvider";
import { NotFound } from "@/pages/NotFound";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RequireAuth } from "@/routes/RequireAuth";
import { GuestOnly } from "@/routes/GuestOnly";
import { HelmetProvider } from "react-helmet-async";
import { dashboardRoutes } from "@/config/dashboard-nav";

const queryClient = new QueryClient();
const mockDashboardRoutes = dashboardRoutes.filter(
  (route) => route.url !== "/dashboard",
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RouteProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route element={<RequireAuth />}>
                <Route path="/dashboard/*" element={<App />}>
                  <Route index element={<Dashboard />} />
                  {mockDashboardRoutes.map((route) => (
                    <Route
                      key={route.url}
                      path={route.url.replace("/dashboard/", "")}
                      element={
                        <PlaceholderPage
                          title={route.title}
                          description={route.description}
                          links={route.items}
                        />
                      }
                    />
                  ))}
                </Route>
              </Route>
              <Route element={<GuestOnly />}>
                <Route path="/auth/*" element={<Auth />}>
                  <Route index element={<RollForm />} />
                  <Route path="signup" element={<SignupForm />} />
                  <Route path="login" element={<LoginForm />} />
                  <Route path="verify" element={<OtpForm />} />
                  <Route
                    path="reset-password"
                    element={<ResetPasswordForm />}
                  />
                </Route>
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </RouteProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </StrictMode>,
);
