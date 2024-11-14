"use client";

import React, { createContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

type User = {
  name: string;
  email: string;
  image: string;
  credits: number;
};

interface UserContextTypes {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  session: Session | null;
  status: "authenticated" | "loading" | "unauthenticated";
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
  const { data: session, status } = useSession();
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

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        session,
        status,
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
