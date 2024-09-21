"use server";

import { getServerSessionAuth } from "../../lib/auth";
import { prisma } from "@/lib/db";

const getUserDetails = async () => {
  const session = await getServerSessionAuth();
  const userEmail = session?.user?.email;
  if (!userEmail || !session)
    return { success: false, message: "User not found" };
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      name: true,
      email: true,
      image: true,
      credits: true,
    },
  });
  if (!user) return { success: false, message: "User not found" };
  return { success: true, data: user };
};

const updateUserCredits = async (email: string, credits: number) => {
  const user = await prisma.user.update({
    where: { email },
    data: { credits },
  });
  return { success: true, data: user };
};

export { getUserDetails, updateUserCredits };
