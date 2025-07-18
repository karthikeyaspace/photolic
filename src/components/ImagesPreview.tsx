"use client";

import {
  ArrowBigRightDash,
  LoaderCircle,
  RefreshCcw,
  Star,
} from "lucide-react";
import { useImages } from "@/hooks/useImages";
import ImageComponent from "./ImageComponent";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const ImagePreview = () => {
  const {
    images,
    loading,
    error,
    fetchImages,
    outputsCount,
    isGenerating,
    saveImageC,
    deleteImageC,
  } = useImages();
  const { user, setShowSideBar, isLoading: authLoading, isAuthenticated } = useUser();

  useEffect(() => {
    // Only fetch images when not loading and authenticated
    if (!authLoading && isAuthenticated) {
      fetchImages(false);
    }
  }, [authLoading, isAuthenticated]);

  const renderContent = () => {
    // Show loader if auth is loading OR images are loading
    if (authLoading || loading) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <LoaderCircle className="w-12 h-12 text-white animate-spin" />
        </div>
      );
    }

    // Show authentication error if not authenticated
    if (!isAuthenticated) {
      return (
        <div className="flex justify-center items-center h-[calc(100vh-10rem)]">
          <p className="text-gray-400">Please sign in to view your images</p>
        </div>
      );
    }

    if (error) {
      return (
        <p className="flex justify-center items-center h-[calc(100vh-10rem)]">
          {error}
        </p>
      );
    }

    if (images.length === 0 && !isGenerating) {
      return (
        <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]">
          <p className="text-gray-400">Create your first image</p>
          <p className="flex items-center justify-center gap-1">
            a cat eating cake spread all over its face
            <span
              onClick={() => setShowSideBar(true)}
              className="bg-blue-600 px-2 text-sm cursor-pointer rounded-sm"
            >
              Run
            </span>
          </p>
        </div>
      );
    }

    const skeletonLoaders = isGenerating
      ? new Array(Number(outputsCount)).fill(null)
      : [];

    const skeletonLoaderContent = skeletonLoaders.map((_, index) => (
      <ImageComponent
        key={`skeleton-${index}`}
        image={null}
        isGenerating={isGenerating}
        onSave={() => {}}
        onDelete={() => {}}
      />
    ));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skeletonLoaderContent}
        {images.map((image, index) => (
          <div key={`skeleton-${index}`}>
            <ImageComponent
              key={image.id}
              image={image}
              isGenerating={false}
              onSave={() => {
                saveImageC(image.id, image.isSaved ? false : true);
              }}
              onDelete={() => {
                deleteImageC(image.id);
              }}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full min-h-[calc(100vh-56px)] flex flex-col ">
      <div className="bg-black h-12 flex justify-between items-center pr-4 md:px-4 border-b border-gray-800 sticky top-0 right-0 z-10">
        <div
          className="bg-blue-600 flex md:hidden rounded-tr rounded-br px-3  gap-1"
          onClick={() => setShowSideBar(true)}
        >
          Build <ArrowBigRightDash />
        </div>

        <div className="text-md flex justify-center items-center gap-2">
          Your Creations{" "}
          <button onClick={() => fetchImages(true)}>
            <RefreshCcw size={18} />
          </button>
        </div>
        <span className="text-gray-400 flex justify-center items-center">
          {user.credits}{" "}
          <Star
            size={18}
            className="text-yellow-500 ml-px mb-[3px]"
            fill="#eab308"
          />
        </span>
      </div>

      <div className="min-h-calc[100vh-104px] p-4 overflow-y-auto small-scrollbar ">
        {renderContent()}
      </div>
    </div>
  );
};

export default ImagePreview;
