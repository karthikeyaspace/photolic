'use client'

import React, { useState, useEffect } from "react";

const ImagePreview = () => {
  interface ImageData {
    uri: string;
    aspectRatio: number;
  }
  
  const [imageData, setImageData] = useState<ImageData[]>([]);
  const imageuris = [
    "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.z3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://replicate.delivery/yhqm/oRYEnCffd9oPl0znVRf1giS2aYY2fnJAGP6Vj2lcfnHxeHL3E/out-0.webp",
    "https://replicate.delivery/yhqm/eRoX2da2QKWnVa6Yj7LBTdt3Rg7riD54fDeN6chAKSMvka3mA/out-0.webp",
    "https://replicate.delivery/yhqm/uqDCcJAXTiI9K5bees2KmGmvrGkexA7nENeem1htU23X4yabC/out-0.webp",
    "https://replicate.delivery/yhqm/SwDg386w2lpTDl1EcCRSmIKxdhEZeUqwdxymLUwzq8HapvuJA/out-0.webp",
  ];

  useEffect(() => {
    const loadImages = async () => {
      const loadedImages = await Promise.all(
        imageuris.map(async (uri) => {
          const img = new Image();
          img.src = uri;
          await img.decode();
          return { uri, aspectRatio: img.width / img.height };
        })
      );
      setImageData(loadedImages);
    };
    loadImages();
  }, []);

  const getSpanClass = (aspectRatio: any) => {
    if (aspectRatio > 1.5) return "col-span-2 row-span-1";
    if (aspectRatio < 0.75) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  return (
    <div className="bg-[#1E1E1E] w-full min-h-screen">
      <div className="flex justify-end items-center p-4 border-b bg-inherit border-gray-700 sticky top-0 right-0 z-50">
        <div className="flex space-x-4">
          <span className="text-gray-400">Saved</span>
          <span className="text-gray-400">Deleted</span>
        </div>
      </div>
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4 p-4">
        {imageData && imageData.map(({ uri, aspectRatio }) => (
          <div key={uri} className={`relative ${getSpanClass(aspectRatio)}`}>
            <img
              src={uri}
              className="w-full h-full object-cover rounded"
              alt="Preview"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;



/**
 * 'use client'

import React, { useState, useEffect } from "react";
import { getAllImages } from "./serverActions"; // Adjust the import path as needed

// Custom hook to fetch images
const useImages = (userId: string) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getAllImages(userId);
        setImages(fetchedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, [userId]);

  return { images, loading, error };
};

const ImagePreview = ({ userId }) => {
  const { images, loading, error } = useImages(userId);

  const getSpanClass = (aspectRatio: number) => {
    if (aspectRatio > 1.5) return "col-span-2 row-span-1";
    if (aspectRatio < 0.75) return "col-span-1 row-span-2";
    return "col-span-1 row-span-1";
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="bg-[#1E1E1E] w-full min-h-screen">
      <div className="flex justify-end items-center p-4 border-b bg-inherit border-gray-700 sticky top-0 right-0 z-50">
        <div className="flex space-x-4">
          <span className="text-gray-400">Saved</span>
          <span className="text-gray-400">Deleted</span>
        </div>
      </div>
      <div className="grid grid-cols-4 auto-rows-[200px] gap-4 p-4">
        {images.map((image) => (
          <div key={image.id} className={`relative ${getSpanClass(parseFloat(image.aspectRatio))}`}>
            <img
              src={image.url}
              className="w-full h-full object-cover rounded"
              alt={image.prompt}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
 */