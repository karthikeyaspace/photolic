import React from 'react';
import Sidebar from '@/components/create/Sidebar';
import ImagePreview from '@/components/create/ImagesPreview';

const CreatePage = () => {
  return (
    <div className='h-[calc(100vh-56px)] w-full flex bg-black '>
      <div className="w-[30%] border-r border-gray-800 overflow-y-auto small-scrollbar ">
        <Sidebar />
      </div>
      <div className="w-[70%]">
        <ImagePreview />
      </div>
    </div>
  );
};

export default CreatePage;