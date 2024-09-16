import { prisma } from "@/lib/db";

const getAllImages = async (userId: string) => {
  try {
    const images = await prisma.generation.findMany({
      where: { userId: userId },
      orderBy: { createdAt: "desc" },
    });
    return images;
  } catch (error) {
    console.error("Failed to fetch images:", error);
    throw new Error("Failed to fetch images");
  }
};

export { getAllImages };
