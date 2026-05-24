export interface LoginRequest {
  emai: String;
  password: String;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  name: String;
  email: String;
  password: String;
  occupation: String;
}
