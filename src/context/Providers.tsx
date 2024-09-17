"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ImageGenerationProvider } from "./ImageGenerationProvider";
import { ImageProvider } from "./ImageProvider";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <ImageProvider>
        <ImageGenerationProvider>{children}</ImageGenerationProvider>
      </ImageProvider>
    </SessionProvider>
  );
};

export default Providers;
