import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { NavLink } from "react-router-dom";
import { rollSchema } from "./schema";

export default function RollForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm({
    resolver: zodResolver(rollSchema),
    defaultValues: {
      roll: "",
    },
  });

  const handleRollSubmit = (formData) => {
    console.log(formData.roll);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleRollSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
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

          <Controller
            control={form.control}
            name="roll"
            render={({ field }) => (
              <div className="flex justify-center">
                <InputOTP
                  maxLength={7}
                  id="digits-only"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot className="digit-slot" index={0} />
                    <InputOTPSlot className="digit-slot" index={1} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot className="digit-slot" index={2} />
                    <InputOTPSlot className="digit-slot" index={3} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot className="digit-slot" index={4} />
                    <InputOTPSlot className="digit-slot" index={5} />
                    <InputOTPSlot className="digit-slot" index={6} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          />

          {form.formState.errors.roll && (
            <FieldDescription>
              {form.formState.errors.roll.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        {/* Back */}
        <Field>
          <NavLink to="/">
            <Button variant="outline" type="button" className="w-full">
              <ArrowLeft />
              Go back
            </Button>
          </NavLink>
        </Field>
      </FieldGroup>
    </form>
  );
}
