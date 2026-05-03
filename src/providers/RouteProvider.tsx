import { RouteContext } from "@/contexts";
import { useLocation, useNavigate } from "react-router-dom";

export default function RouteProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = (defaultPage) => {
    const from = location.state?.from;
    console.log(from);

    if (from) {
      navigate(from, { replace: true });
    } else {
      navigate(defaultPage, { replace: true });
    }
  };

  return (
    <RouteContext.Provider value={{ handleBack }}>
      {children}
    </RouteContext.Provider>
  );
}
