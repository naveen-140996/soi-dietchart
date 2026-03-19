"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check cookie on load
  useEffect(() => {
    const token = Cookies.get("auth");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ Login function
  const login = () => {
    Cookies.set("auth", "true", { expires: 7 }); // 7 days
    setIsLoggedIn(true);
  };

  // ✅ Logout function
  const logout = () => {
    Cookies.remove("auth");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
};