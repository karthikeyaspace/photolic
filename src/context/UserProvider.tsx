"use client";

import React, { createContext, useState, useEffect } from "react";
import { getUserDetails, updateUserCredits } from "@/app/actions/userAction";
import t from "@/lib/Toast";
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
  updateCredits: (credits: number) => void;
}

export const UserContext = createContext<UserContextTypes | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [apiKeyDiv, setApiKeyDiv] = useState(false);
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
    const getUser = async () => {
      const response = await getUserDetails();
      if (response.success && response.data) {
        setUser({
          name: response.data.name || "",
          email: response.data.email,
          image: response.data.image || "",
          credits: response.data.credits,
        });
      } else t(response.message || "Failed to get user", "error");
    };
    if (status === "authenticated") getUser();
  }, [status]);

  const updateCredits = async (credits: number) => {
    const response = await updateUserCredits(user.email, credits);
    if (!response.success) {
      t("Failed to update credits", "error");
      return;
    }
    setUser({ ...user, credits });
  };

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
        updateCredits,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
