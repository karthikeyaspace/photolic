"use server";
import { getServerSessionAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const getAllImages = async () => {
  const session = await getServerSessionAuth();
  if (!session || !session?.user?.email)
    return { success: false, message: "User not authenticated" };
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return { success: false, message: "User not found" };

  try {
    const images = await prisma.generation.findMany({
      where: { userId: user.id },
      select: {
        url: true,
        prompt: true,
        aspectRatio: true,
        isSaved: true,
        model: true,
      },
      orderBy: { createdAt: "desc" },
      // causing order issue as a user can create multiple images at once - in schema add autoincrement in a new filed and order by that
    });
    return { success: true, data: images };
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};

export { getAllImages };
