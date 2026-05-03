import Logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background/70 backdrop-blur">
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Logo"
          className="h-8 w-8 object-contain bg-primary rounded-sm"
        />
        <span className="font-semibold tracking-tight">Mechowarts</span>
      </div>

      <Button variant="outline">
        <NavLink to="/auth">Login</NavLink>
      </Button>
    </header>
  );
}
