"use client";

import React from "react";

const ImagePreview = () => {
  // const imagesJson = localStorage.getItem("images");
  let images;
  if (typeof window !== "undefined") {
    images = localStorage.getItem("images");
  }
  const imageuris = images
    ? JSON.parse(images)
    : [
        "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1674343963928-d67007d2ae74?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ];
  if (!imageuris) return null;
  return (
    <div className="bg-[#1E1E1E] h-full w-full">
      <div className="flex justify-end items-center p-4 border-b border-gray-700">
        <div className="flex space-x-4 ">
          <span className="text-gray-400">Saved</span>
          <span className="text-gray-400">Deleted</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 p-4 overflow-y-auto">
        {imageuris.map((image: string) => (
          <div key={image} className="relative">
            {image ? (
              <img src={image} className="w-full h-48 object-cover rounded" />
            ) : (
              <div className="w-full h-48 bg-gray-800 rounded"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
