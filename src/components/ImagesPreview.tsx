'use client'

import React from "react";
import { LoaderCircle, RefreshCcw } from "lucide-react";
import { useImages } from "@/hooks/useImages";
import { useGeneration } from "@/hooks/useGeneration";
import ImageComponent from "./ImageComponent";

const ImagePreview = () => {
  const { images, loading, error, refetch } = useImages();
  const { generatingConfig, isGenerating } = useGeneration();
  
  const renderLoaderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="w-12 h-12 text-white animate-spin" />
        </div>
      );
    }

    if (error) {
      return <p className="text-red-500 text-center">{error}</p>;
    }

    return null;
  };

  const renderImageGrid = () => {
    if (images.length === 0 && !isGenerating) {
      return (
        <div className="flex justify-center items-center h-full">
          <p className="text-gray-400">No images available</p>
        </div>
      );
    }

    const imagesToRender = isGenerating
      ? Array(4).fill({ url: "", prompt: "" })
      : images.slice(0, 4);

    return (
      <div className="grid grid-cols-2 gap-4 h-full">
        {imagesToRender.map((image, index) => (
          <ImageComponent
            key={index+1}
            image={image}
            isGenerating={isGenerating}
            onSave={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-black flex justify-between items-center px-4 h-14 border-b border-gray-800 sticky top-0 right-0 z-50">
        <div className="font-bold text-lg flex justify-center items-center gap-2">
          Your Creations{" "}
          <button>
            <RefreshCcw onClick={refetch} size={20} />
          </button>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-400">Saved</span>
          <span className="text-gray-400">Deleted</span>
        </div>
      </div>

      <div className="flex-grow p-4">
        {renderLoaderContent()}
        {renderImageGrid()}
      </div>
    </div>
  );
};

export default ImagePreview;
