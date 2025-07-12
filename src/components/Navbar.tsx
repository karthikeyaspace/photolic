"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { LogOut, Key, Trash, PlusCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import t from "@/lib/Toast";
import { getUserDetails } from "@/app/actions/userAction";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser, isAuthenticated, setApiKeyDiv, setApiKey, apiKey } = useUser();
  const { logout } = useAuth();
  
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

  const handleSignOut = () => {
    setShowMenu(false);
    logout();
  };

  useEffect(() => {
    const getUser = async () => {
      if (!isAuthenticated) return;
      const response = await getUserDetails();
      if (response.success && response.data) {
        setUser({
          name: response.data.name || "",
          email: response.data.email,
          image: response.data.image || "",
          credits: response.data.credits,
        });
      } else t(response.message || "Failed to get user", "error");
    };
    getUser();
  }, [isAuthenticated]);

  return (
    <div className="h-14 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-lg flex gap-1 bg-gradient-to-br from-yellow-100 via-yellow-600 to-red-400 bg-clip-text text-transparent">
        <span className="font-bold">PHOTOLIC</span>
      </div>

      <div className="flex items-center relative">
        {isAuthenticated && (
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center space-x-2 text-gray-200 hover:text-white"
          >
            {user.image && (
              <img src={user.image} alt="User image" className="w-8 h-8 rounded-full" />
            )}
          </button>
        )}

        {showMenu && isAuthenticated && (
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
                {apiKey ? "Update" : "Setup"} API Key
              </button>

              {apiKey && (
                <button
                  onClick={handleRemoveApiKey}
                  className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150"
                >
                  <Trash size={16} className="mr-2" />
                  Remove API Key
                </button>
              )}

              <button className="text-gray-200 hover:bg-gray-700 p-2 rounded-md flex items-center transition duration-150">
                <PlusCircle size={16} className="mr-2" />
                <a href="https://itskv.me" target="_blank">
                  Add Credits
                </a>
              </button>

              <button
                onClick={handleSignOut}
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
