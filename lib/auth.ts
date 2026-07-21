export type SignInCredentials = {
  email: string;
  password: string;
};

export type AuthUser = {
  email: string;
  name: string;
};

export type SignInResult = {
  success: boolean;
  user?: AuthUser;
  message: string;
};

const AUTH_STORAGE_KEY = "mechowarts-auth";

export function signIn(credentials: SignInCredentials): Promise<SignInResult> {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email);
  const isPasswordValid = credentials.password.length >= 8;

  if (!isEmailValid) {
    return Promise.resolve({
      success: false,
      message: "Enter a valid email address.",
    });
  }

  if (!isPasswordValid) {
    return Promise.resolve({
      success: false,
      message: "Password must be at least 8 characters.",
    });
  }

  const user: AuthUser = {
    email: credentials.email,
    name: credentials.email.split("@")[0],
  };

  return Promise.resolve({
    success: true,
    user,
    message: "Signed in successfully.",
  });
}

export function storeAuthUser(user: AuthUser) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed?.email && parsed?.name) {
      return parsed;
    }
  } catch {
    return null;
  }

  return null;
}

export function clearStoredUser() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(AUTH_STORAGE_KEY);
}
