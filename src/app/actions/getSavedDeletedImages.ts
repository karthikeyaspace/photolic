"use server";

import { getServerSessionAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const getSavedImages = async () => {
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
      where: { userId: user.id, isSaved: true },
      select: {
        id: true,
        url: true,
        prompt: true,
        aspectRatio: true,
        isSaved: true,
        model: true,
      },
      orderBy: [{ count: "desc" }, { createdAt: "desc" }],
    });

    return { success: true, data: images };
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};

const getDeletedImages = async () => {
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
      where: { userId: user.id, isDeleted: true },
      select: {
        id: true,
        url: true,
        prompt: true,
        aspectRatio: true,
        isSaved: true,
        model: true,
      },
      orderBy: [{ count: "desc" }, { createdAt: "desc" }],
    });

    return { success: true, data: images };
  } catch (error) {
    throw new Error("Failed to fetch images");
  }
};

export { getSavedImages, getDeletedImages };
