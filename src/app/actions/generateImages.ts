"use server";

import { ImageDBType, SidebarFormTypes } from "@/lib/types";
import Replicate from "replicate";
import { getServerSessionAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const generateImages = async (formData: SidebarFormTypes) => {
  const replicate = new Replicate({
    auth: formData.useApiKey ? formData.apiKey : process.env.REPLICATE_API_KEY,
  });

  const session = await getServerSessionAuth();
  const userEmail = session?.user?.email;
  if (!userEmail || !session)
    return { success: false, message: "User not found" };
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true, credits: true },
  });
  if (!user) return { success: false, message: "User not found" };
  if (
    (user.credits < formData.numOutputs || user.credits <= 0) &&
    !formData.useApiKey
  )
    return {
      success: false,
      message: "Insufficient credits, cannot generate images",
    };

  try {
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        seed: Number(formData.seed),
        prompt: formData.prompt,
        go_fast: true,
        num_outputs: Number(formData.numOutputs),
        aspect_ratio: formData.aspectRatio,
        output_format: "webp",
        output_quality: 80,
        disable_safety_checker: formData.disableSafetyChecker,
      },
    });

    // console.log(formData)
    // // for testing
    // const output: {} = [
    //   // "https://replicate.delivery/yhqm/YqT3k2fXEekEc0Y7OIQ2f87X7YwxFSvRuqeaXcBN6fgiuEbbC/out-0.webp",
    //   "https://replicate.delivery/yhqm/kyPeqr5fbJjVVEtFcc1FNaoRmQTlI4rMGXEujiIkKazDex2mA/out-0.webp",
    //   "https://replicate.delivery/yhqm/u8ytQNN5qA7CCJfhrAZT66SFoLpY6X0voJsLgWhz2Cq7XwtJA/out-0.webp",
    //   // "https://replicate.delivery/yhqm/5KAmBeSNi92pFCdvjWz5qYv1Ulnb3kHWFdeaajvjTew8Mp7mA/out-0.webp",
    //   // "https://replicate.delivery/yhqm/dfp8t0dGqvzPRSDywMQBnD0bzFgyJ1iDuvI2J4uWUZKOVstJA/out-0.webp",
    // ];

    if (!output)
      return { success: false, message: "Failed to generate Images" };

    const imageuris = output as string[];
    const data: ImageDBType[] = [];
    imageuris.forEach((uri) => {
      data.push({
        userId: user.id,
        url: uri,
        seed: Number(formData.seed),
        prompt: formData.prompt,
        aspectRatio: formData.aspectRatio,
        model: "black-forest-labs/flux-schnell",
        disableSafetyChecker: formData.disableSafetyChecker,
      });
    });

    await prisma.generation.createMany({
      data: data,
    });

    const recentlyAdded = await prisma.generation.findMany({
      where: { userId: user.id },
      select: {
        id: true,
        url: true,
        prompt: true,
        seed: true,
        aspectRatio: true,
        model: true,
        isSaved: true,
      },
      orderBy: { count: "desc" },
      take: Number(formData.numOutputs),
    });

    return {
      success: true,
      message: "Images generated successfully",
      data: recentlyAdded,
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate Images, API error",
    };
  }
};

export { generateImages };
