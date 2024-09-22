"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import { LogOut, Key, Trash } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import t from "@/lib/Toast";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, session, setApiKeyDiv, setApiKey } = useUser();
  const handleApiKeyDiv = () => {
    setShowMenu(false);
    setApiKeyDiv(true);
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem("phokey");
    setApiKey("");
    setShowMenu(false);
    t("API key removed from your localstorage", "info");
  };

  return (
    <div className="h-14 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-lg flex gap-1 bg-gradient-to-br from-yellow-100 via-yellow-600 to-red-400 bg-clip-text text-transparent">
        <span className="font-bold">PHOTOLIC.AI</span>
      </div>

      <div className="flex items-center relative">
        {session && (
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 text-gray-200 hover:text-white"
          >
            {user.name && user.image && (
              <>
                <span>{user?.name}</span>
                <img
                  src={user?.image}
                  alt="User profile"
                  className="w-8 h-8 rounded-full"
                />
              </>
            )}
          </button>
        )}

        {showMenu && session && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            className="absolute top-12 right-0 bg-gray-800 shadow-lg rounded-md p-2 w-48 z-20"
          >
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleApiKeyDiv}
                className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150"
              >
                <Key size={16} className="mr-2" />
                Setup API Key
              </button>
              <button
                onClick={handleRemoveApiKey}
                className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150"
              >
                <Trash size={16} className="mr-2" />
                Remove API Key
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
