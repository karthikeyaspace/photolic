"use client";

import {
  ArrowBigRightDash,
  LoaderCircle,
  RefreshCcw,
  Star,
} from "lucide-react";
import { useImages } from "@/hooks/useImages";
import ImageComponent from "./ImageComponent";
import { AnimatePresence, motion } from "framer-motion";
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
  const { user, setShowSideBar } = useUser();

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
          <button onClick={() => refetch(true)}>
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
