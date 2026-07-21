"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { clearStoredUser, getStoredUser, type AuthUser } from "@/lib/auth";

export default function DashboardWelcome() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const handleSignOut = () => {
    clearStoredUser();
    setUser(null);
    router.push("/auth");
  };

  return (
    <div className="space-y-6">
      <section className="border-border bg-card/90 rounded-3xl border p-8 shadow-sm">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-muted-foreground text-sm tracking-[0.35em] uppercase">
                Student dashboard
              </p>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome to Mechowarts
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground">
            {user
              ? `You are signed in as ${user.email}. Use the dashboard to manage courses, progress, and resources.`
              : "Sign in to unlock your student dashboard and access academic tools."}
          </p>
        </div>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {user ? (
          <Button type="button" variant="outline" onClick={handleSignOut}>
            Sign out
          </Button>
        ) : (
          <Button type="button" onClick={() => router.push("/auth")}>
            Sign in
          </Button>
        )}
      </div>
    </div>
  );
}
