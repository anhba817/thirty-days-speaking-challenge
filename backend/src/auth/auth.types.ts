export interface AuthUser {
  id: string;
  email: string;
  name?: string | null;
}

export interface JwtPayload {
  sub: string;
  email: string;
  name?: string | null;
}
