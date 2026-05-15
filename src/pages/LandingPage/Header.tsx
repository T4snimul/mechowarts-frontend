import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md px-6 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Logo"
            className="h-8 w-8 object-contain bg-primary rounded-sm"
          />
          <span className="font-semibold tracking-tight">Mechowarts</span>
        </div>

        <NavLink to="/auth">
          <Button variant="outline">Login</Button>
        </NavLink>
      </div>
    </header>
  );
}
