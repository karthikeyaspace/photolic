'use client'

import React from "react";
import { motion } from "framer-motion";
import { Save, Trash2 } from "lucide-react";

const ImageComponent = ({
  image,
  isGenerating,
  onSave,
  onDelete,
}: {
  image: { url: string; prompt: string };
  isGenerating: boolean;
  onSave: (image: { url: string; prompt: string }) => void;
  onDelete: (image: { url: string; prompt: string }) => void;
}) => {
  if (isGenerating) {
    return (
      <div className="w-full h-96 animate-pulse bg-gray-800 rounded-lg" />
    );
  }

  return (
    <motion.div
      className="w-full h-96 relative group overflow-hidden rounded-lg shadow-lg"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <img
        src={image.url}
        className="w-full h-96 object-cover"
        alt={image.prompt}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
        <div className="flex justify-end space-x-2">
          <button
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            onClick={() => onSave(image)}
          >
            <Save className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-2 bg-gray-800 rounded-full hover:bg-gray-700"
            onClick={() => onDelete(image)}
          >
            <Trash2 className="w-5 h-5 text-white" />
          </button>
        </div>
        <div>
          <p className="text-sm text-white truncate">{image.prompt}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageComponent;
