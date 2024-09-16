"use server";
import { revalidatePath } from "next/cache";
import { SidebarFormTypes } from "@/lib/types";
import Replicate from "replicate";
import { getServerSessionAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";

const replicate = new Replicate();
const generateImages = async (formData: SidebarFormTypes) => {
  const session = await getServerSessionAuth();
  const userEmail = session?.user?.email;
  if (!userEmail) return { success: false, message: "User not authenticated" };
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });

  try {
    // const output: {} = await replicate.run("black-forest-labs/flux-schnell", {
    //   input: {
    //     prompt: `${formData.prompt}, ${formData.emotion}, ${formData.cameraPosition}, ${formData.place}`,
    //     num_outputs: Number(formData.numOutputs),
    //     aspect_ratio: formData.aspectRatio.toString(),
    //     output_format: "png",
    //     output_quality: 75,
    //     disable_safety_checker: true,
    //     guidance_scale: 3.5,
    //     num_inference_steps: 30,
    //     lora_scale: 0.8,
    //     seed: formData.useSeed
    //       ? parseInt(formData.seed)
    //       : Math.floor(Math.random() * 1000000),
    //   },
    // });

    await new Promise((resolve) => setTimeout(resolve, 5000));

    const output: {} = [
      "https://replicate.delivery/yhqm/JexfSeAOMWKbVJcPVvQNk7jBMFwiHoiv0BhN5vsNe3cTpfrbC/out-0.png",
      "https://replicate.delivery/yhqm/JexfSeAOMWKbVJcPVvQNk7jBMFwiHoiv0BhN5vsNe3cTpfrbC/out-0.png",
    ];

    if (!output) throw new Error("no output");
    const imageuris = output as string[];

    imageuris.forEach(async (uri) => {
      await prisma.generation.create({
        data: {
          url: uri,
          prompt: formData.prompt,
          aspectRatio: formData.aspectRatio,
          seed: formData.useSeed
            ? parseInt(formData.seed)
            : Math.floor(Math.random() * 1000000),
          inferenceSteps: 30,
          model: "black-forest-labs/flux-schnell",
          user: {
            connect: { id: user?.id },
          },
        },
      });
    });

    revalidatePath("/create");

    return { success: true, data: imageuris };
  } catch (error) {
    return { success: false, message: "Failed to generate Images" + error };
  }
};

export { generateImages };
