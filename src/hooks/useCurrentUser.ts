import { getCurrentUser } from "@/api/auth";
import { getAuthToken } from "@/lib/auth-token";
import { useQuery } from "@tanstack/react-query";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "currentUser"],
    queryFn: getCurrentUser,
    enabled: Boolean(getAuthToken()),
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
