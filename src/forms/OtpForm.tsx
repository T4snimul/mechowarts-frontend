import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";

export default function OtpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <img
              src={Logo}
              alt="Logo"
              className="h-6 w-6 object-contain bg-primary rounded-sm"
            />
            <span className="font-semibold text-md tracking-tight">
              Mechowarts
            </span>
          </div>
          <h1 className="text-2xl font-bold">Verify your identity</h1>

          <p className="text-sm text-muted-foreground">
            We’ve sent a 6-digit code to
          </p>

          <span className="font-code text-xs bg-accent px-2 py-1 rounded text-primary">
            2408020@student.ruet.ac.bd
          </span>
        </div>

        {/* OTP Inputs */}
        <Field>
          <FieldLabel>Enter OTP</FieldLabel>

          <div className="flex justify-center gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Input
                key={i}
                maxLength={1}
                inputMode="numeric"
                className="h-12 w-10 text-center text-lg font-mono"
              />
            ))}
          </div>

          <FieldDescription className="text-center">
            Didn’t get the code?{" "}
            <button type="button" className="underline">
              Resend
            </button>
          </FieldDescription>
        </Field>

        {/* Submit */}
        <Field>
          <Button type="submit" className="w-full">
            Verify & Continue
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        {/* Back */}
        <Field>
          <Button variant="outline" type="button" className="w-full">
            <ArrowLeft />
            Go back
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
