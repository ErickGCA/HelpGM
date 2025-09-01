export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}
