"use client";
import React from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="h-14 px-6 flex justify-between items-center border-b border-gray-800">
      <div className="text-lg flex gap-1 bg-gradient-to-tr from-yellow-100 via-yellow-600 to-red-700 bg-clip-text text-transparent">
        <span className="font-bold">PHOTOLIC</span> <p>AI</p>
      </div>

      <div>
        <Link href={"/login"}>Login</Link>
        <button
          onClick={() => signOut()}
          className="bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
