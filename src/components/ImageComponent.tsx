"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Trash2, X, Copy, ExternalLink, Heart } from "lucide-react";

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
        <img
          src={image.url}
          className="w-full h-full object-cover"
          alt={image.prompt}
        />
      </motion.div>
      <div className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-b from-transparent to-black/50">
        <div className="flex justify-end space-x-2">
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900 relative rounded-lg p-3 max-w-2xl w-full mx-4 text-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowDetails(false)}
                className="p-1 absolute top-2 right-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex flex-col mt-6 px-4">
                <img
                  src={image.url}
                  alt={image.prompt}
                  className="rounded-md max-h-[80vh]"
                />
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold">Prompt</h3>
                    <p className="text-gray-300">{image.prompt}</p>
                    <h3 className="text-sm font-semibold">Model</h3>
                    <p className="text-gray-300">{image.model}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
