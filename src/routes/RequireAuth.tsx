import { useCurrentUser } from "@/hooks/useCurrentUser";
import { clearAuthToken, getAuthToken } from "@/lib/auth-token";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const getCurrentPath = (location: ReturnType<typeof useLocation>) =>
  `${location.pathname}${location.search}${location.hash}`;

export function RequireAuth() {
  const location = useLocation();
  const token = getAuthToken();
  const currentUserQuery = useCurrentUser();

  if (!token) {
    return (
      <Navigate to="/auth" replace state={{ from: getCurrentPath(location) }} />
    );
  }

  if (currentUserQuery.isPending) {
    return null;
  }

  if (currentUserQuery.isError || !currentUserQuery.data) {
    clearAuthToken();

    return (
      <Navigate to="/auth" replace state={{ from: getCurrentPath(location) }} />
    );
  }

  return <Outlet />;
}
