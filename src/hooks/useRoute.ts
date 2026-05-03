import { RouteContext } from "@/contexts";
import { useContext } from "react";

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (!context) throw new Error("RouteContext missing");
  return context;
};
