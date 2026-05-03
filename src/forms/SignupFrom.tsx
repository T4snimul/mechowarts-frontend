import { cn } from "@/lib/utils";
import GoogleLogo from "@/assets/google.svg";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeft, Mars, Venus } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema } from "./schema";
import { z } from "zod";
import { NavLink } from "react-router";

type FormData = z.infer<typeof signupSchema>;

export default function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm<FormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      password: "",
      confirmPassword: "",
    },
  });

  const formErrors = form.formState.errors;

  const handleSignup = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleSignup)}
      noValidate
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
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm/5.5 text-balance text-muted-foreground">
            Your account will be associated with:{" "}
            <span className="font-code font-bold text-xs bg-accent p-1 rounded text-primary">
              2408020@student.ruet.ac.bd
            </span>
          </p>
        </div>
        <FieldGroup className="grid max-w-sm grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input
              id="firstName"
              {...form.register("firstName")}
              type="text"
              className="bg-background"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input
              id="lastName"
              {...form.register("lastName")}
              type="text"
              className="bg-background"
            />
          </Field>

          {formErrors.firstName ? (
            <FieldDescription>{formErrors.firstName.message}</FieldDescription>
          ) : (
            formErrors.lastName && (
              <FieldDescription>{formErrors.lastName.message}</FieldDescription>
            )
          )}
        </FieldGroup>
        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <ToggleGroup
            type="single"
            variant="outline"
            onValueChange={(value) => {
              if (!value) return;
              form.setValue("gender", value as "male" | "female", {
                shouldDirty: true,
                shouldValidate: true,
              });
            }}
            className="border grid grid-cols-2"
          >
            <ToggleGroupItem value="male">
              <Mars />
              Male
            </ToggleGroupItem>
            <ToggleGroupItem value="female">
              <Venus /> Female
            </ToggleGroupItem>
          </ToggleGroup>

          {formErrors.gender && (
            <FieldDescription>{formErrors.gender.message}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            {...form.register("password")}
            type="password"
            className="bg-background"
          />
          {formErrors.password && (
            <FieldDescription>{formErrors.password.message}</FieldDescription>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            {...form.register("confirmPassword")}
            type="password"
            className="bg-background"
          />
          {formErrors.confirmPassword && (
            <FieldDescription>
              {formErrors.confirmPassword.message}
            </FieldDescription>
          )}
        </Field>
        <Field>
          <Button type="submit">Create Account</Button>
        </Field>
        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex justify-center"
          >
            <img className="w-3.5 h-3.5" src={GoogleLogo} alt="google logo" />
            <span>Sign up with Google</span>
          </Button>
          <NavLink to="/auth">
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
