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

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin" size={24} />
      </div>
    );
  } else if (status === "unauthenticated")
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <div>
            <h2 className="text-2xl font-bold mb-6 text-center">Welcome</h2>
            <p className="text-gray-600 mb-8 text-center">
              Please sign in to continue
            </p>
            <button
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              <LogIn size={24} />
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    );
};

export default Signin;
