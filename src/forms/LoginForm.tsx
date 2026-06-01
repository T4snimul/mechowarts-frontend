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
import { Avatar } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";
import { loginSchema } from "./schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useRoute } from "@/hooks/useRoute";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "@/api/types";
import { useEffect } from "react";
import { login } from "@/api/auth";
import axios from "axios";
import { setAuthToken } from "@/lib/auth-token";

type FormData = z.infer<typeof loginSchema>;

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const { handleBack } = useRoute();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const roll = searchParams.get("roll");
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData<User>(["user", roll]);
  const redirectTo = location.state?.from ?? "/dashboard";

  useEffect(() => {
    if (!cachedUser) {
      navigate("/auth", { replace: true, state: { from: redirectTo } });
    }
  }, [cachedUser, navigate, redirectTo]);

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      roll: roll || "",
      password: "",
    },
  });

  const formErrors = form.formState.errors;

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: ({ user, token }) => {
      setAuthToken(token);
      queryClient.setQueryData(["user", user.roll], user);
      queryClient.setQueryData(["auth", "session"], { user });

      navigate(redirectTo, {
        replace: true,
      });
    },
    onError: (error: unknown) => {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message || error.message
        : "Something went wrong";

      form.setError("password", {
        type: "server",
        message,
      });
    },
  });

  const handleLogin = (formData: FormData) => {
    loginMutation.mutate(formData);
  };

  if (!cachedUser) {
    return null;
  }

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
            {cachedUser.nameAvatar && (
              <img
                className="rounded-full"
                src={cachedUser.nameAvatar}
                alt={cachedUser.name}
              />
            )}
          </Avatar>

          <h1 className="text-2xl font-bold">
            Welcome back, {cachedUser.name.trim().split(" ").pop()}!
          </h1>

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
          <Button
            disabled={loginMutation.isPending}
            type="submit"
            className="w-full"
          >
            {loginMutation.isPending ? "Logging in..." : "Log In"}
          </Button>
          <FieldDescription className="text-center px-6">
            Forgot your password?{" "}
            <NavLink
              to={`/auth/verify?roll=${roll ?? ""}`}
              state={{ from: `/auth/login?roll=${roll ?? ""}` }}
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
