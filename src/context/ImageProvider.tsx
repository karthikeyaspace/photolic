"use client";

import React, { useState, useEffect, createContext, useCallback } from "react";
import { getAllImages } from "@/app/actions/getAllImages";
import { ImageResProps } from "@/lib/types";
import { useSession } from "next-auth/react";

interface ImageContextType {
  images: ImageResProps[];
  addImages: (newImages: ImageResProps[]) => void;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
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

  const fetchImages = useCallback(async () => {
    setLoading(true);
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setError("User email not available");
      setLoading(false);
      return;
    }

    try {
      const response = await getAllImages();
      if (response.success && response.data) {
        setImages(response.data);
      } else {
        setError(response.message || "Failed to fetch images");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchImages();
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
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider };
