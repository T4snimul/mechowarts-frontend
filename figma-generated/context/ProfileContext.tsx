"use client";

import { createContext, useContext, useState } from "react";
import type { PersonProfile } from "../types";

interface ProfileContextValue {
  selectedProfile: PersonProfile | null;
  openProfile: (p: PersonProfile) => void;
  closeProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [selectedProfile, setSelectedProfile] = useState<PersonProfile | null>(
    null,
  );

  return (
    <ProfileContext.Provider
      value={{
        selectedProfile,
        openProfile: setSelectedProfile,
        closeProfile: () => setSelectedProfile(null),
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
