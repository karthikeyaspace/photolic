import { getServerSessionAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function Home() {
  const session = getServerSessionAuth()
  if(!session) return redirect("/login")
  return redirect("/create");
}
