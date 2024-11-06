"use server";

import { getServerSessionAuth } from "../../lib/auth";
import { prisma } from "@/lib/db";

const saveImage = async (imageId: string) => {
  const session = await getServerSessionAuth();
  if (!session || !session?.user?.email)
    return { success: false, message: "User not authenticated" };

  try {
    await prisma.generation.update({
      where: { id: imageId },
      data: { isSaved: true },
    });

    return { success: true, message: "Image saved successfully" };
  } catch (error) {
    return { success: false, message: "Failed to save image" };
  }
};

// unsave image

const unsaveImage = async (imageId: string) => {
  const session = await getServerSessionAuth();
  if (!session || !session?.user?.email)
    return { success: false, message: "User not authenticated" };

  try{
    await prisma.generation.update({
      where: { id: imageId },
      data: { isSaved: false },
    })
    return { success: true, message: "Image unsaved successfully" };
  }
  catch (error) {
    return { success: false, message: "Failed to unsave image" };
  }
}

const deleteImage = async (imageId: string) => {
  const session = await getServerSessionAuth();
  if (!session || !session?.user?.email)
    return { success: false, message: "User not authenticated" };

  try {
    await prisma.generation.update({
      where: { id: imageId },
      data: { isDeleted: true },
    });
    return { success: true, message: "Image deleted successfully" };
  } catch (error) {
    return { success: false, message: "Failed to delete image" };
  }
};

export { saveImage, deleteImage, unsaveImage };
