import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type AuthenticatedUser = {
  user?: string | null;
  accessToken?: string | null;
  roles?: number[];
};

type HeaderConfig = { headers?: { Authorization: string } };

type AuthState = {
  auth: AuthenticatedUser | null;
  setAuth: Dispatch<SetStateAction<AuthenticatedUser | null>>;
  config?: HeaderConfig;
};

const initialState: AuthState = {
  auth: null,
  config: {},
  setAuth: () => {},
};

const AuthContext = createContext<AuthState>(initialState);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthenticatedUser | null>(null);

  const config: HeaderConfig = {
    headers: { Authorization: `Bearer ${auth?.accessToken}` },
  };

  return (
    <AuthContext.Provider value={{ auth, config, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
