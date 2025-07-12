"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Key, ExternalLink, Shield } from "lucide-react";
import { useUser } from "@/hooks/useUser";
import t from "@/lib/Toast";

const SetApiKey = () => {
  const { apiKeyDiv, setApiKeyDiv, apiKey, setApiKey } = useUser();
  const [akey, setAkey] = useState("");

  useEffect(() => {
    setAkey(apiKey || "");
  }, [apiKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("phokey", akey);
    setApiKey(akey);
    setApiKeyDiv(false);
    t("API key saved successfully", "success");
  };

  if (apiKeyDiv) {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setApiKeyDiv(false);
      }
    });
  }

  return (
    <AnimatePresence>
      {apiKeyDiv && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setApiKeyDiv(false)}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="bg-gray-800 p-4 sm:p-5 rounded-md w-full max-w-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              onClick={() => setApiKeyDiv(false)}
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 flex items-center text-white">
              <Key className="mr-3 h-6 w-6 text-blue-400" /> Set your API key
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={akey}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAkey(e.target.value)
                  }
                  placeholder="Enter your Replicate API key"
                  className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-sm flex items-center justify-center "
              >
                <Key className="mr-2 h-5 w-5" />
                Save API Key
              </button>
            </form>
            <p className="text-xs leading-relaxed mt-4 text-gray-400">
              <Shield className="inline-block mr-1 h-4 w-4" />
              Your API key is securely stored in your browsers local storage and
              is never stored in our servers.
            </p>
            <a
              href="https://replicate.com/account/api-tokens"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 text-blue-400 hover:text-blue-300 flex items-center justify-center transition-colors duration-200"
            >
              Get your Replicate API key
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SetApiKey;
