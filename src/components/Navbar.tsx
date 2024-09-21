"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Key } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();
  const handleApiKeyClick = () => {};

  return (
    <div className="h-14 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-lg flex gap-1 bg-gradient-to-br from-yellow-100 via-yellow-600 to-red-400 bg-clip-text text-transparent">
        <span className="font-bold">PHOTOLIC.AI</span>
      </div>

      <div className="flex items-center relative">
        <img
          src={
            user.image ||
            "https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          }
          className="w-10 h-10 rounded-full cursor-pointer z-50"
          onClick={() => setShowMenu(!showMenu)}
        />

        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-md p-2 w-48 z-20"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleApiKeyClick}
                className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150"
              >
                <Key size={16} className="mr-2" />
                Setup API Key
              </button>
              <button
                onClick={() => signOut()}
                className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150"
              >
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
