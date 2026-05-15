import { RouteContext } from "@/contexts";
import { useLocation, useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

export default function RouteProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = (defaultPage: string) => {
    const from = location.state?.from;
    console.log("redirected from", from);

    if (from) {
      navigate(from, { replace: true });
    } else {
      navigate(defaultPage);
    }
  };

  return (
    <RouteContext.Provider value={{ handleBack }}>
      {children}
    </RouteContext.Provider>
  );
}
