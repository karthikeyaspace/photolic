"use client";

import React from "react";
import { createContext, useState } from "react";

interface ImageGenerationContextType {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  outputsCount: number;
  setOutputsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ImageGenerationContext = createContext<
  ImageGenerationContextType | undefined
>(undefined);

const ImageGenerationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputsCount, setOutputsCount] = useState<number>(1);
  return (
    <ImageGenerationContext.Provider
      value={{
        isGenerating,
        setIsGenerating,
        outputsCount,
        setOutputsCount,
      }}
    >
      {children}
    </ImageGenerationContext.Provider>
  );
};

export { ImageGenerationProvider };
