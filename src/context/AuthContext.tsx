"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  credits: number;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = Cookies.get("auth_token");
      if (token) {
        const response = await fetch("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          Cookies.remove("auth_token");
        }
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      Cookies.remove("auth_token");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async () => {
    return new Promise<void>((resolve, reject) => {
      const popup = window.open(
        `/api/auth/google`,
        "googleLogin",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup) {
        reject(new Error("Failed to open popup"));
        return;
      }

      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          // Check if login was successful by checking for token
          const token = Cookies.get("auth_token");
          if (token) {
            checkAuthStatus().then(() => resolve());
          } else {
            reject(new Error("Login cancelled"));
          }
        }
      }, 1000);

      // Listen for messages from popup
      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;
        
        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          popup.close();
          clearInterval(checkClosed);
          window.removeEventListener("message", messageListener);
          checkAuthStatus().then(() => resolve());
        } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          popup.close();
          clearInterval(checkClosed);
          window.removeEventListener("message", messageListener);
          reject(new Error(event.data.error || "Login failed"));
        }
      };

      window.addEventListener("message", messageListener);
    });
  };

  const logout = () => {
    Cookies.remove("auth_token");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
