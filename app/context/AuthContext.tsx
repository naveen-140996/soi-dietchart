"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface UserType {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (data: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // 🔥 Load from cookies on refresh
  useEffect(() => {
    const savedToken = Cookies.get("token");
    const savedUser = Cookies.get("user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // 🔥 LOGIN
  const login = (data: any) => {
    setToken(data.token);
    setUser(data.user);

    // ✅ Store in cookies (7 days expiry)
    Cookies.set("token", data.token, { expires: 7 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
  };

  // 🔥 LOGOUT
  const logout = () => {
    setToken(null);
    setUser(null);

    // ✅ Remove cookies
    Cookies.remove("token");
    Cookies.remove("user");

    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoggedIn: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 🔥 Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Wrap inside AuthProvider");
  return context;
};