import api from "@/lib/axios";
import type {
  CheckRollResponse,
  LoginPayload,
  LoginResponse,
  User,
} from "@/api/types";

export const checkRoll = async (roll: string): Promise<CheckRollResponse> => {
  const response = await api.get<CheckRollResponse>(`/users/${roll}`);
  return response.data;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
