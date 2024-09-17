"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogIn, Loader2 } from "lucide-react";

const Signin = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/create");
    }
  }, [status, router]);

  const handleSignIn = async () => {
    try {
      await signIn("google", { callbackUrl: "/create" });
    } catch (error) {
      console.error("Failed to sign in:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-56px)]">
      {status === "loading" ? (
        <Loader2 className="animate-spin" size={24} />
      ) : status === "unauthenticated" ? (
        <button
          onClick={handleSignIn}
          className="max-w-md flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white border hover:border-2 transition duration-200"
        >
          <LogIn size={24} />
          Sign in with Google
        </button>
      ) : null}
    </div>
  );
};

export default Signin;
