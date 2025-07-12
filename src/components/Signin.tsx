"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LogIn, Loader2 } from "lucide-react";
import Cookies from "js-cookie";

const Signin = () => {
  const { isAuthenticated, isLoading, checkAuthStatus } = useAuth();
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
      const popup = window.open(
        `/api/auth/google`,
        "googleLogin",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );
      if (!popup) {
        throw new Error("Failed to open popup");
      }

      const checkPopupClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkPopupClosed);
          const token = Cookies.get("auth_token");
          if (token) {
            checkAuthStatus().then(() => {
              setIsSigningIn(false);
              router.push("/create");
            });
          } else {
            setIsSigningIn(false);
            alert("Authentication failed. Please try again.");
          }
        }
      }, 1000);

      // Wait for the popup to close and the authentication to complete
      const listener = (event: MessageEvent) => {
        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          popup.close();
          window.removeEventListener("message", listener);
          clearInterval(checkPopupClosed);
          checkAuthStatus().then(() => {
            router.push("/create");
          });
        }
        else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          popup.close();
          clearInterval(checkPopupClosed);
          window.removeEventListener("message", listener);
          alert(event.data.error || "Authentication failed");
        }
      };

      setIsSigningIn(false);

      window.addEventListener("message", listener);
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
