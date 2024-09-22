"use client";

import { LoaderCircle, RefreshCcw, Star } from "lucide-react";
import { useImages } from "@/hooks/useImages";
import ImageComponent from "./ImageComponent";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";

const ImagePreview = () => {
  const {
    images,
    loading,
    error,
    refetch,
    outputsCount,
    isGenerating,
    saveImageC,
    deleteImageC,
  } = useImages();
  const { user } = useUser();

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <LoaderCircle className="w-12 h-12 text-white animate-spin" />
        </div>
      );
    }

    if (error) {
      return <p className="flex justify-center items-center h-full">{error}</p>;
    }

    if (images.length === 0 && !isGenerating) {
      return (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-gray-400">Create your first image</p>
          <p>
            "a cat eating cake spread all over its face"{" "}
            <span
              onClick={() => console.log("building")}
              className="bg-blue-600 px-2 py-1 cursor-pointer rounded-sm"
            >
              Run
            </span>{" "}
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
          <AnimatePresence key={index}>
            <motion.div
              key={`skeleton-${index}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ImageComponent
                key={image.id}
                image={image}
                isGenerating={false}
                onSave={() => {
                  saveImageC(image.id);
                }}
                onDelete={() => {
                  deleteImageC(image.id);
                }}
              />
            </motion.div>
          </AnimatePresence>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-[calc(100vh-56px)] flex flex-col ">
      <div className="bg-black flex justify-between items-center px-4 py-4 border-b border-gray-800 sticky top-0 right-0 z-10">
        <div className="font-bold text-lg flex justify-center items-center gap-2">
          Your Creations{" "}
          <button onClick={() => refetch(true)}>
            <RefreshCcw size={20} />
          </button>
        </div>
        <div className="flex space-x-4">
          <span className="text-gray-400 flex justify-center items-center">
            Credits left: {user.credits}{" "}
            <Star
              size={18}
              className="text-yellow-500 ml-px mb-[3px]"
              fill="#eab308"
            />
          </span>
          <Link href="/create">
            <span>All</span>
          </Link>
          <Link href="/create?state=saved">
            <span>Saved</span>
          </Link>
          <Link href="/create?state=deleted">
            <span>Deleted</span>
          </Link>
        </div>
      </div>

      <div className="flex-grow p-4 h-[calc(100vh-112px)] overflow-y-auto small-scrollbar ">
        {renderContent()}
      </div>
    </div>
  );
};

export default ImagePreview;
