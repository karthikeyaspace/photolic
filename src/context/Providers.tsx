"use client";

import React from "react";
import { AuthProvider } from "./AuthContext";
import { ImageProvider } from "./ImageProvider";
import { UserProvider } from "./UserProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <ImageProvider>{children}</ImageProvider>
      </UserProvider>
    </AuthProvider>
  );
};

export default Providers;
