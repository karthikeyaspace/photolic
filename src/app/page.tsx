import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[calc(100vh-100px)] flex flex-col justify-center items-center">
      <h1>Will make a landing page after getting funded</h1>
      <Link href={"/login"} className="underline text-blue-600">
        login
      </Link>
    </div>
  );
}
