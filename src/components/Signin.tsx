"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Loader2 } from "lucide-react";

const Signin = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/create");
    }
  }, [isAuthenticated, router]);

  const handleSignIn = async () => {
    setIsSigningIn(true);
    router.push("/api/auth/google")
  };

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-56px)]">
      {error && (
        <p className="text-red-500 mb-4">
          Failed to authenticate
        </p>
      )}
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
