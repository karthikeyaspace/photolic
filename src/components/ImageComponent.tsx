"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Save, Trash2, X } from "lucide-react";

interface ImageResProps {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: string;
  model: string;
  isSaved: boolean;
}

export default function Component({
  image,
  isGenerating,
  onSave,
  onDelete,
}: {
  image: ImageResProps | null;
  isGenerating: boolean;
  onSave: (image: { id: string }) => void;
  onDelete: (image: { id: string }) => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  if (isGenerating || !image) {
    return <div className="w-full h-96 animate-pulse bg-gray-800 rounded-lg" />;
  }

  if (showDetails) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setShowDetails(false);
      }
    });
  }

  return (
    <motion.div
      className="w-full h-96 relative group overflow-hidden rounded-lg cursor-pointer"
      whileHover="hover"
      onClick={() => setShowDetails(true)}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hover: { scale: 1.02 },
        }}
        transition={{ duration: 0.5 }}
      >
        <img src={image.url} className="w-full h-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="flex justify-end space-x-2">
          <a
            href={image.url}
            download
            className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
          >
            <Download className="w-5 h-5 text-white" />
          </a>
          <button
            className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
            disabled={image.isSaved}
            onClick={(e) => {
              e.stopPropagation();
              onSave(image);
            }}
          >
            <Save
              className={`w-5 h-5 ${
                image.isSaved ? "text-blue-400" : "text-white"
              }`}
            />
          </button>
          <button
            className="p-2 bg-gray-800/80 rounded-full hover:bg-gray-700/80 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(image);
            }}
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="text-sm text-white truncate">{image.prompt}</p>
      </div>

      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/80"
            onClick={() => setShowDetails(false)}
          >
            <img
              src={image.url}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(false);
              }}
              className="p-2 absolute top-4 right-4 rounded-full bg-gray-800/80 hover:bg-gray-700/80 transition-colors border"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            <p className="absolute bottom-4 left-4 right-4 text-sm text-white text-center bg-black/50 p-2 rounded">
              {image.prompt}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
