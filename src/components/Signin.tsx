"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Loader2 } from "lucide-react";

const Signin = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/create");
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async () => {
    try {
      setIsSigningIn(true);
      await login();
      // The router.push will be handled by the useEffect above
    } catch (error) {
      console.error("Failed to sign in:", error);
      setIsSigningIn(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-56px)]">
      {(isLoading || isSigningIn) ? (
        <Loader2 className="animate-spin" size={24} />
      ) : !isAuthenticated ? (
        <button
          onClick={handleSignIn}
          disabled={isSigningIn}
          className="max-w-md flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white border hover:border-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogIn size={24} />
          Sign in with Google
        </button>
      ) : null}
    </div>
  );
};

export default Signin;
