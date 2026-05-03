import LeftLayout from "./LeftLayout";
import RightLayout from "./RightLayout";

export default function Auth() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <LeftLayout />
      <RightLayout />
    </div>
  );
}
