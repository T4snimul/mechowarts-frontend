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

export default function RollForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
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
          <h1 className="text-2xl font-bold">Welcome to Mechowarts</h1>

          <p className="text-sm text-muted-foreground">
            Enter your roll number to continue
          </p>
        </div>

        <Field>
          <FieldLabel>Roll Number</FieldLabel>

          <div className="flex justify-center gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <Input
                key={i}
                maxLength={1}
                inputMode="numeric"
                className="h-12 w-10 text-center text-lg font-mono"
              />
            ))}
          </div>
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Continue
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
