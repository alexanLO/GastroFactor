export interface LoginRequest {
  emai: String;
  password: String;
}

export interface AuthResponse {
  accessToken: String;
  refreshToken: String;
}

export interface RegisterRequest {
  name: String;
  email: String;
  password: String;
  occupation: String;
}
