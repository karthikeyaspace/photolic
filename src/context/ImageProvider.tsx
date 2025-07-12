"use client";

import React, { useState, createContext, useEffect } from "react";
import { getAllImages } from "@/app/actions/getAllImages";
import { ImageResProps } from "@/lib/types";
import { useAuth } from "./AuthContext";
import t from "@/lib/Toast";
import {
  saveImage,
  unsaveImage,
  deleteImage,
} from "@/app/actions/saveDeleteImage";

interface ImageContextType {
  images: ImageResProps[];
  loading: boolean;
  error: string | null;
  fetchImages: (userLoad: boolean) => Promise<void>;
  isGenerating: boolean;
  setIsGenerating: React.Dispatch<React.SetStateAction<boolean>>;
  outputsCount: number;
  setOutputsCount: React.Dispatch<React.SetStateAction<number>>;
  saveImageC: (id: string, save: boolean) => void;
  deleteImageC: (id: string) => void;
  addImages: (newImages: ImageResProps[]) => void;
}

export const ImageContext = createContext<ImageContextType | undefined>(
  undefined
);

const ImageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [images, setImages] = useState<ImageResProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [outputsCount, setOutputsCount] = useState<number>(1);

  const fetchImages = async (userLoad: boolean) => {
    if (userLoad) setLoading(true);
    
    // Wait for auth to complete before checking authentication
    if (authLoading) {
      if (userLoad) setLoading(false);
      return;
    }
    
    if (!isAuthenticated) {
      setError("Please sign in to view images");
      setLoading(false);
      return;
    }
    
    try {
      const response = await getAllImages();
      if (response.success && response.data) {
        setImages(response.data as ImageResProps[]);
        setError(null);
        if (userLoad) t("Images fetched successfully", "success");
      } else {
        setError(response.message || "Failed to fetch images");
        t(response.message || "Failed to fetch images", "error");
      }
    } catch (error) {
      setError("Failed to fetch Images");
      t("Failed to fetch Images", "error");
    } finally {
      setLoading(false);
    }
  };

  // Auto-fetch images when authentication is complete
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchImages(false);
    } else if (!authLoading && !isAuthenticated) {
      setImages([]);
      setError(null);
      setLoading(false);
    }
  }, [authLoading, isAuthenticated]);

  const saveImageC = (id: string, save: boolean) => {
    setImages((prev) => {
      return prev.map((image) => {
        if (image.id === id) {
          return { ...image, isSaved: !image.isSaved };
        }
        return image;
      });
    });
    if (save) saveImage(id);
    else unsaveImage(id);
  };

  const deleteImageC = (id: string) => {
    setImages((prev) => {
      return prev.filter((image) => image.id !== id);
    });
    deleteImage(id);
  };

  const addImages = (newImages: ImageResProps[]) => {
    setImages((prev) => [...newImages, ...prev]);
  };

  return (
    <ImageContext.Provider
      value={{
        images,
        loading,
        error,
        fetchImages,
        isGenerating,
        setIsGenerating,
        outputsCount,
        setOutputsCount,
        saveImageC,
        deleteImageC,
        addImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { ImageProvider };
