import { createContext } from "react";

type RouteContextType = {
  handleBack: (defaultPage: string) => void;
};

const RouteContext = createContext<RouteContextType | null>(null);

export { RouteContext };
