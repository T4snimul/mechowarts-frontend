import api from "@/lib/axios";
import type { CheckRollResponse } from "./types";

export const checkRoll = async (roll: string): Promise<CheckRollResponse> => {
  const response = await api.get<CheckRollResponse>(`/users/${roll}`);
  return response.data;
};
