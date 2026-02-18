export type LoginData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  ok: boolean;
  status?: number;
  message?: string;
  errorMessage?: string;
  token?: string;
};
