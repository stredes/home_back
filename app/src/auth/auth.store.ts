import { createContext } from 'react';

export interface AuthContextValue {
  isAuthenticated: boolean;
  accessToken: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  refresh: () => Promise<string | null>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
