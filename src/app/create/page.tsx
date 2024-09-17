import React from "react";
import Sidebar from "@/components/Sidebar";
import ImagePreview from "@/components/ImagesPreview";
import { getServerSessionAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

const CreatePage = async () => {
  const session = await getServerSessionAuth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-[calc(100vh-56px)] w-full flex bg-black ">
      <div className="w-[30%] border-r border-gray-800">
        <Sidebar />
      </div>
      <div className="w-[70%]  overflow-y-auto small-scrollbar ">
        <ImagePreview />
      </div>
    </div>
  );
};

export default CreatePage;
