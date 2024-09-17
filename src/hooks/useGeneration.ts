import { useContext } from "react";
import { ImageGenerationContext } from "@/context/ImageGenerationProvider";

const useGeneration = () => {
  const context = useContext(ImageGenerationContext);
  if (!context) {
    throw new Error(
      "useGeneration must be used within a ImageGenerationProvider"
    );
  }
  return context;
};

export { useGeneration };
