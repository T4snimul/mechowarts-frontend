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
}
