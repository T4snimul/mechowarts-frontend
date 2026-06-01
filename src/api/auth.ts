import api from "@/lib/axios";
import type {
  AuthResponse,
  CheckRollResponse,
  LoginPayload,
  SignupPayload,
  User,
} from "@/api/types";

export const checkRoll = async (roll: string): Promise<CheckRollResponse> => {
  const response = await api.get<CheckRollResponse>(`/users/${roll}`);
  return response.data;
};

export const signup = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
