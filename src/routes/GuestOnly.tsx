import { getAuthToken } from "@/lib/auth-token";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const getRedirectPath = (from: unknown) => {
  if (typeof from === "string" && !from.startsWith("/auth")) {
    return from;
  }

  return "/dashboard";
};

export function GuestOnly() {
  const location = useLocation();
  const token = getAuthToken();

  if (token) {
    return (
      <Navigate
        to={getRedirectPath(location.state?.from)}
        replace
      />
    );
  }

  return <Outlet />;
}
