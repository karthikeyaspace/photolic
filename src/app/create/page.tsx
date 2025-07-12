import { getServerAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Create from "@/components/Create";

const CreatePage = async () => {
  const session = await getServerAuth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="h-[calc(100vh-56px)] w-full bg-black">
      <Create />
    </div>
  );
};

export default CreatePage;
