"use client";

import React from "react";
import { createContext, useState } from "react";

interface ImageGenerationContextType {
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  generatingConfig: {
    numOutputs: number;
    aspectRatio: string;
  };
  setGeneratingConfig: React.Dispatch<
    React.SetStateAction<{
      numOutputs: number;
      aspectRatio: string;
    }>
  >;
}

export const ImageGenerationContext = createContext<
  ImageGenerationContextType | undefined
>(undefined);

const ImageGenerationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatingConfig, setGeneratingConfig] = useState({
    numOutputs: 1,
    aspectRatio: "2:3",
  });
  return (
    <ImageGenerationContext.Provider
      value={{
        isGenerating,
        setIsGenerating,
        generatingConfig,
        setGeneratingConfig,
      }}
    >
      {children}
    </ImageGenerationContext.Provider>
  );
};

export { ImageGenerationProvider };
