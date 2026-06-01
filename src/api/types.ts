export interface User {
  id: string;
  name: string;
  roll: string;
  gender: string;
  nameAvatar: string;
}

export interface CheckRollResponse {
  exists: boolean;
  user?: User;
  roll: string;
}

export type LoginPayload = {
  roll: string;
  password: string;
};

export interface LoginResponse {
  user: User;
  token: string;
}

export type ApiError = {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
};
