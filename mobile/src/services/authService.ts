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

export interface AccountDeletionResult {
  // ISO timestamp when the account will be permanently deleted (request + 30d).
  scheduledDeletionAt: string;
}

// Schedule the signed-in user's account for deletion after a 30-day grace
// period. Signing in again before then cancels it.
export function deleteAccount(token: string): Promise<AccountDeletionResult> {
  return apiFetch<AccountDeletionResult>(
    '/api/auth/me',
    { method: 'DELETE' },
    token,
  );
}
