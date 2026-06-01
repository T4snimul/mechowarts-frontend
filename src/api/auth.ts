import api from "@/lib/axios";
import type { CheckRollResponse, LoginPayload, LoginResponse } from "./types";

export const checkRoll = async (roll: string): Promise<CheckRollResponse> => {
  const response = await api.get<CheckRollResponse>(`/users/${roll}`);
  return response.data;
};

export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", payload);
  return response.data;
};
