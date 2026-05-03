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
import { z } from "zod";
import { otpSchema } from "./schema";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useContext } from "react";
import { RouteContext } from "@/contexts";

type FormData = z.infer<typeof otpSchema>;

export default function OtpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleBack } = useContext(RouteContext);

  const form = useForm<FormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const formErrors = form.formState.errors;

  const handleOtpSubmit = (formData: FormData) => {
    console.log(formData.otp);
  };

  return (
    <form
      noValidate
      onSubmit={form.handleSubmit(handleOtpSubmit)}
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
          <h1 className="text-2xl font-bold">Verify your identity</h1>

          <p className="text-sm text-muted-foreground">
            We’ve sent a 6-digit code to
          </p>

          <span className="font-code text-xs bg-accent px-2 py-1 rounded text-primary">
            2408020@student.ruet.ac.bd
          </span>
        </div>

        <Field>
          <FieldLabel>Enter OTP</FieldLabel>

          <Controller
            control={form.control}
            name="otp"
            render={({ field }) => (
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  id="digits-only"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={field.value}
                  onChange={field.onChange}
                >
                  <InputOTPGroup>
                    <InputOTPSlot className="digit-slot" index={0} />
                    <InputOTPSlot className="digit-slot" index={1} />
                    <InputOTPSlot className="digit-slot" index={2} />
                    <InputOTPSlot className="digit-slot" index={3} />
                    <InputOTPSlot className="digit-slot" index={4} />
                    <InputOTPSlot className="digit-slot" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
            )}
          />

          {formErrors.otp && (
            <FieldDescription>{formErrors.otp.message}</FieldDescription>
          )}
          <FieldDescription className="text-center">
            Didn’t get the code?{" "}
            <button type="button" className="underline">
              Resend
            </button>
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Verify & Continue
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        <Field>
          <Button
            onClick={() => handleBack("/auth")}
            variant="outline"
            type="button"
            className="w-full"
          >
            <ArrowLeft />
            Go back
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
