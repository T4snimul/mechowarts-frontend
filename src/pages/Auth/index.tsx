import { Outlet } from "react-router";
import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

export default function Auth() {
  return (
    <div className="selection:bg-primary selection:text-background grid min-h-svh lg:grid-cols-2">
      <LeftLayout>
        <Outlet />
      </LeftLayout>
      <RightLayout />
    </div>
  );
}
