"use client";

import React, { createContext, useState, useEffect } from "react";
import { getUserDetails, updateUserCredits } from "@/app/actions/userAction";
import t from "@/lib/Toast";
import { useSession } from "next-auth/react";

type User = {
  name: string;
  email: string;
  image: string;
  credits: number;
};

interface UserContextTypes {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateCredits: (credits: number) => void;
}

export const UserContext = createContext<UserContextTypes | undefined>(
  undefined
);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    image: "",
    credits: 0,
  });

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
      } else t(response.message || "Failed to fetch user details", "error");
    };
    if (status === "authenticated") getUser();
  }, [status]);

  const updateCredits = async (credits: number) => {
    const response = await updateUserCredits(user.email, credits);
    if (!response.success) {
      t("Failed to update credits", "error");
      return;
    }
    console.log(response.data);
    setUser({ ...user, credits });
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateCredits }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider };
