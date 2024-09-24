"use client";

import React from "react";
import ImagePreview from "./ImagesPreview";
import SetApiKey from "./SetApiKey";
import Sidebar from "./Sidebar";
import { useUser } from "@/hooks/useUser";

const Create = () => {
  const { showSideBar } = useUser();

  return (
    <div className="flex h-full">
      <div
        className={`
          fixed w-full md:relative md:w-[30%] h-full bg-gray-900 border-r border-gray-800 transition-transform duration-300 ease-in-out z-50 ${
            showSideBar ? "translate-x-0" : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </div>

      <div className="flex-grow overflow-y-auto small-scrollbar transition-all duration-300 ease-in-out w-full md:w-[70%]">
        <ImagePreview />
      </div>

      <SetApiKey />
    </div>
  );
};

export default Create;
