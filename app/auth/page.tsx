import type { Metadata } from "next";

import RootHeader from "@/components/shared/root-header";
import LoginForm from "@/components/shared/login-form";

export const metadata: Metadata = {
  title: "Mechowarts | Sign In",
  description: "Student login for Mechowarts.",
};

export default function AuthPage() {
  return (
    <div className="selection:bg-primary selection:text-background from-background to-muted/40 flex min-h-screen flex-col bg-linear-to-b">
      <RootHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="mx-auto w-full max-w-4xl space-y-10">
          <section className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm tracking-[0.35em] uppercase">
              Student login
            </p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              Sign in to your Mechowarts account
            </h1>
            <p className="text-muted-foreground mx-auto max-w-2xl text-base leading-7">
              Access your courses, progress tracking, and student resources with
              a secure student login.
            </p>
          </section>

          <div className="border-border bg-card/90 rounded-[2rem] border p-8 shadow-sm">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
