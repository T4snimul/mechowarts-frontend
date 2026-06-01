import { getAuthToken } from "@/lib/auth-token";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const getCurrentPath = (location: ReturnType<typeof useLocation>) =>
  `${location.pathname}${location.search}${location.hash}`;

export function RequireAuth() {
  const location = useLocation();
  const token = getAuthToken();

  if (!token) {
    return (
      <Navigate
        to="/auth"
        replace
        state={{ from: getCurrentPath(location) }}
      />
    );
  }

  return <Outlet />;
}
