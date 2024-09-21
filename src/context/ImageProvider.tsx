"use client";

import React, { useState, useEffect, createContext, useCallback } from "react";
import { getAllImages } from "@/app/actions/getAllImages";
import { ImageResProps } from "@/lib/types";
import { useSession } from "next-auth/react";
import t from "@/lib/Toast";

interface ImageContextType {
  images: ImageResProps[];
  addImages: (newImages: ImageResProps[]) => void;
  loading: boolean;
  error: string | null;
  refetch: (userLoad: boolean) => Promise<void>;

  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  outputsCount: number;
  setOutputsCount: React.Dispatch<React.SetStateAction<number>>;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session, status } = useSession();
  const [images, setImages] = useState<ImageResProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputsCount, setOutputsCount] = useState<number>(1);

  const fetchImages = async (userLoad: boolean) => {
    if (userLoad) setLoading(true);
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setError("User email not available");
      setLoading(false);
      t("User not signed in", "error");
      return;
    }
    console.log("Fetching images");
    try {
      const response = await getAllImages();
      if (response.success && response.data) {
        setImages(response.data);
        if (userLoad) t("Images fetched successfully", "success");
      } else {
        setError(response.message || "Failed to fetch images");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(false);
  }, [status]);

  const addImages = (newImages: ImageResProps[]) => {
    newImages.reverse();
    setImages((prevImages) => [...newImages, ...prevImages]);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        addImages,
        loading,
        error,
        refetch: fetchImages,
        isGenerating,
        setIsGenerating,
        outputsCount,
        setOutputsCount,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider };
