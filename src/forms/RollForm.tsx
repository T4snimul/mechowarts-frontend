import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import GoogleLogo from "@/assets/google.svg";
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
import { rollSchema } from "./schema";
import { z } from "zod";
import { useRoute } from "@/hooks/useRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkRoll } from "@/api/auth";
import { useLocation, useNavigate } from "react-router-dom";
import type { ApiError } from "@/api/types";

type FormData = z.infer<typeof rollSchema>;

export default function RollForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleBack } = useRoute();
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const redirectTo = location.state?.from ?? "/dashboard";

  const form = useForm<FormData>({
    resolver: zodResolver(rollSchema),
    defaultValues: {
      roll: "",
    },
  });

  const formErrors = form.formState.errors;

  const checkRollMutation = useMutation({
    mutationFn: (roll: string) => checkRoll(roll),
    onSuccess: (data) => {
      if (data.exists && data.user) {
        if (!data.user.isVerified && data.verificationEmailSent) {
          queryClient.setQueryData(["user", data.user.email], data.user);
          navigate(
            `/auth/verify?type=verify&email=${encodeURIComponent(data.user.email)}`,
            {
              state: {
                from: redirectTo,
              },
            },
          );
        } else {
          queryClient.setQueryData(["user", data.user.roll], data.user);
          navigate(`/auth/login?roll=${data.user.roll}`, {
            state: {
              from: redirectTo,
            },
          });
        }
      } else {
        navigate(`/auth/signup?roll=${data.roll}`, {
          state: {
            from: redirectTo,
          },
        });
      }
    },
    onError: (error: unknown) => {
      const err = error as ApiError;

      const message =
        err.response?.data?.message || err.message || "Something went wrong";

      form.setError("roll", {
        type: "server",
        message,
      });
    },
  });

  const handleRollSubmit = (formData: FormData) => {
    checkRollMutation.mutate(formData.roll);
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

          {formErrors.roll && (
            <FieldDescription>{formErrors.roll.message}</FieldDescription>
          )}
        </Field>

        <Field>
          <Button
            disabled={checkRollMutation.isPending}
            type="submit"
            className="w-full"
          >
            {checkRollMutation.isPending ? "Verifying..." : "Continue"}
          </Button>
        </Field>

        <FieldSeparator>or</FieldSeparator>

        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex justify-center"
          >
            <img className="w-3.5 h-3.5" src={GoogleLogo} alt="google logo" />
            <span>Continue with Google</span>
          </Button>
          <Button
            onClick={() => handleBack("/")}
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
