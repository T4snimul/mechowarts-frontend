export interface User {
  id: string;
  name: string;
  email: string;
  roll: string;
  gender: string;
  nameAvatar: string;
  isVerified: boolean;
}

export interface CheckRollResponse {
  exists: boolean;
  user?: User;
  roll: string;
  verificationEmailSent;
}

export type SignupPayload = {
  name: string;
  roll: string;
  gender: "male" | "female";
  password: string;
};

export type LoginPayload = {
  roll: string;
  password: string;
};

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SignupResponse {
  message: string;
  user: User;
  verificationEmailSent: boolean;
}

export interface VerifyResponse {
  message: string;
  user: User;
  verificationEmailSent: boolean;
}

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};
