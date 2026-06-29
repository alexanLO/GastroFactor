export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string | null;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  occupation: string;
}
