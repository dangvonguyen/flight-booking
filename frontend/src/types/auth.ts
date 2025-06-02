export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    is_active: boolean;
    is_superuser: boolean;
  };
}

export interface User {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
} 