import { cn } from "@/lib/utils";
import GoogleLogo from "@/assets/google.svg";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ArrowLeft } from "lucide-react";
import Logo from "@/assets/logo.svg";

export default function SignupForm({
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
          <h1 className="text-2xl font-bold">Create an Account</h1>
          <p className="text-sm/5.5 text-balance text-muted-foreground">
            Your account will be associated with:{" "}
            <span className="font-code font-bold text-xs bg-accent p-1 rounded text-primary">
              2408020@student.ruet.ac.bd
            </span>
          </p>
        </div>
        <div className="grid max-w-sm grid-cols-2 gap-2">
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input
              id="firstName"
              type="text"
              required
              className="bg-background"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input
              id="lastName"
              type="text"
              required
              className="bg-background"
            />
          </Field>
        </div>
        <Field>
          <FieldLabel htmlFor="gender">Gender</FieldLabel>
          <ToggleGroup type="single" className="border grid grid-cols-2">
            <ToggleGroupItem value="male">Male</ToggleGroupItem>
            <ToggleGroupItem value="female">Female</ToggleGroupItem>
          </ToggleGroup>
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            type="password"
            required
            className="bg-background"
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="confirm-password">Confirm Password</FieldLabel>
          <Input
            id="confirm-password"
            type="password"
            required
            className="bg-background"
          />
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
          <Button variant="outline" type="button" className="w-full">
            <ArrowLeft />
            Go back
          </Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
