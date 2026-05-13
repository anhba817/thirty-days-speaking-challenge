import { apiFetch } from './apiClient';

export interface AuthUser {
  id: string;
  email: string;
  name: string | null;
  avatarUrl: string | null;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

export function loginWithGoogle(idToken: string): Promise<AuthSession> {
  return apiFetch<AuthSession>('/api/auth/google', {
    method: 'POST',
    body: JSON.stringify({ idToken }),
  });
}

export function fetchMe(token: string): Promise<AuthUser> {
  return apiFetch<AuthUser>('/api/auth/me', {}, token);
}
