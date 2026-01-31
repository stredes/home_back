import { useMemo, useState, useEffect, useCallback } from 'react';
import { setAccessToken } from '../api/token';
import { refreshAccessToken } from '../api/api';
import { AuthContext } from './auth.store';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const token = await refreshAccessToken();
      if (token) {
        setAccessTokenState(token);
        return token;
      }
      return null;
    } catch {
      return null;
    }
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(accessToken),
      accessToken,
      isLoading,
      login: (token: string) => {
        setAccessToken(token);
        setAccessTokenState(token);
      },
      logout: () => {
        setAccessToken(null);
        setAccessTokenState(null);
      },
      refresh,
    }),
    [accessToken, isLoading, refresh],
  );

  useEffect(() => {
    let isActive = true;
    (async () => {
      const token = await refresh();
      if (isActive) {
        if (!token) {
          setAccessToken(null);
          setAccessTokenState(null);
        }
        setIsLoading(false);
      }
    })();
    return () => {
      isActive = false;
    };
  }, [refresh]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
