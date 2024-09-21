"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ImageProvider } from "./ImageProvider";
import { UserProvider } from "./UserProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <UserProvider>
        <ImageProvider>{children}</ImageProvider>
      </UserProvider>
    </SessionProvider>
  );
};

export default Providers;
