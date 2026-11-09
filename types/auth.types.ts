export interface UserProfile {
  full_name: string | null;
  avatar_url: string | null;
}

export interface UserResponse {
  id: number;
  email: string;
  is_active: boolean;
  profile?: UserProfile | null;
}

export interface Token {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface UserCreate {
  email: string;
  password: string;
  full_name?: string | null;
}

export interface UserLogin {
  email: string;
  password: string;
}
