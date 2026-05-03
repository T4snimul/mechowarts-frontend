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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { loginSchema } from "./schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { RouteContext } from "@/contexts";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleBack } = useContext(RouteContext);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      roll: "2408020",
      password: "",
    },
  });
  const formErrors = form.formState.errors;

  const handleLogin = (formData: FormData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={form.handleSubmit(handleLogin)}
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
          <Avatar className="h-12 w-12 rounded-full">
            {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
            <AvatarFallback className="rounded-full">TH</AvatarFallback>
          </Avatar>

          <h1 className="text-2xl font-bold">Welcome back, Hasan!</h1>

          <p className="text-sm text-muted-foreground">
            Good to see you again. Let’s get you inside.
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
          <Button type="submit" className="w-full">
            Log In
          </Button>
          <FieldDescription className="text-center px-6">
            Forgot your password?{" "}
            <NavLink
              to="/auth/verify"
              state={{ from: "/auth/login" }}
              replace
              className="underline"
            >
              Reset it
            </NavLink>
          </FieldDescription>
        </Field>

        <FieldSeparator>Or</FieldSeparator>
        <Field>
          <Button
            variant="outline"
            type="button"
            className="flex justify-center"
          >
            <img className="w-3.5 h-3.5" src={GoogleLogo} alt="google logo" />
            <span>Login with Google</span>
          </Button>
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
