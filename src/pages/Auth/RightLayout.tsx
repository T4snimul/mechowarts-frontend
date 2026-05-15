export default function RightLayout() {
  return (
    <div className="relative hidden bg-muted lg:block">
      <img
        src="/auth-side-image.svg"
        alt="Authentication side illustration"
        className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
      />
    </div>
  );
}
