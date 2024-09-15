"use server";
import { revalidatePath } from "next/cache";
import { SidebarFormTypes } from "@/lib/types";
import Replicate from "replicate";
// import prisma from "@/lib/db";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
const generateImages = async (formData: SidebarFormTypes) => {
  try {
    const output = await replicate.run("black-forest-labs/flux-schnell", {
      input: {
        prompt: `${formData.prompt}, ${formData.emotion}, ${formData.cameraPosition}, ${formData.place}`,
        num_outputs: Number(formData.numOutputs),
        aspect_ratio: formData.aspectRatio.toString(),
        output_format: "png",
        output_quality: 75,
        disable_safety_checker: true,
        guidance_scale: 3.5,
        num_inference_steps: 30,
        lora_scale: 0.8,
        seed: formData.useSeed
          ? parseInt(formData.seed)
          : Math.floor(Math.random() * 1000000),
      },
    });

    if (!output) throw new Error("no output");

    // await prisma.user.update({
    //   where: { email: "karthikeyaveruturi2005@gmail.com" },
    //   data: {
    //     images: {
    //       push: images,
    //     },
    //   },
    // });

    revalidatePath("/create");

    return { success: true, data: output };
  } catch (error) {
    return { success: false, message: "Failed to generate Images" + error };
  }
};

export { generateImages };
