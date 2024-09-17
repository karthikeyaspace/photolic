"use client";

import { ImageContext } from "@/context/ImageProvider";
import { useContext } from "react";

const useImages = () => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error("useImages must be used within an ImageProvider");
  }
  return context;
};

export { useImages };
