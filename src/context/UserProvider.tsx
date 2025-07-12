"use client";

import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

type User = {
  name: string;
  email: string;
  image: string;
  credits: number;
};

interface UserContextTypes {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  isAuthenticated: boolean;
  isLoading: boolean;
  apiKeyDiv: boolean;
  setApiKeyDiv: React.Dispatch<React.SetStateAction<boolean>>;
  apiKey?: string;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  showSideBar: boolean;
  setShowSideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextTypes | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user: authUser, isAuthenticated, isLoading } = useAuth();
  const [apiKeyDiv, setApiKeyDiv] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  const [apiKey, setApiKey] = useState<string>("");
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    image: "",
    credits: 0,
  });

  useEffect(() => {
    const lkey = localStorage.getItem("phokey");
    if (lkey) setApiKey(lkey);
  }, []);

  useEffect(() => {
    if (authUser) {
      setUser({
        name: authUser.name,
        email: authUser.email,
        image: authUser.image,
        credits: authUser.credits,
      });
    } else {
      setUser({
        name: "",
        email: "",
        image: "",
        credits: 0,
      });
    }
  }, [authUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        isLoading,
        apiKeyDiv,
        setApiKeyDiv,
        apiKey,
        setApiKey,
        showSideBar,
        setShowSideBar,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
