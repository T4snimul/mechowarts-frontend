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
import { resetPasswordSchema } from "./schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { RouteContext } from "@/contexts";

type FormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleBack } = useContext(RouteContext);

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const formErrors = form.formState.errors;

  const handleResetPassword = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleResetPassword)}
      noValidate
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1.5 text-center">
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

          <h1 className="text-2xl font-bold">Reset Password</h1>

          <p className="text-sm text-muted-foreground">
            Please reset your password
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            {...form.register("password")}
            className="bg-background"
          />
          {formErrors.password && (
            <FieldDescription>{formErrors.password.message}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            {...form.register("confirmPassword")}
            className="bg-background"
          />
          {formErrors.confirmPassword && (
            <FieldDescription>
              {formErrors.confirmPassword.message}
            </FieldDescription>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </Field>

        <FieldSeparator>Or</FieldSeparator>
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
