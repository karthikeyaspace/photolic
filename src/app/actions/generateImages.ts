"use server";
import { revalidatePath } from "next/cache";
import { SidebarFormTypes } from "@/lib/types";
import Replicate from "replicate";
import { getServerSessionAuth } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

type GenerationCreateManyInput = {
  id?: string;
  userId: string;
  url: string;
  prompt: string;
  aspectRatio: string;
  seed?: number | null;
  inferenceSteps?: number;
  model: string;
  isSaved?: boolean;
  createdAt?: Date | string;
};

const replicate = new Replicate();
const generateImages = async (formData: SidebarFormTypes) => {
  const session = await getServerSessionAuth();
  const userEmail = session?.user?.email;
  if (!userEmail || !session) return redirect("/login");
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: { id: true },
  });
  if (!user) redirect("/login");

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

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const output: {} = [
      // "https://replicate.delivery/yhqm/7MsAZYg6Oc7fIi2M432PjpecCTOAYGgQzq1OQgEmnf8yvs2mA/out-0.webp",
      // "https://replicate.delivery/yhqm/OnDse4K75UzQXSIPNaCvc2SF4Juyy1KCzcz96aBHJm0yLrtJA/out-0.webp",
      // "https://replicate.delivery/yhqm/h88Mv0YnzzJlA9AZAztDqhQq86QpD2mXigm7YpIpxGNaTu2E/out-0.webp",
      // "https://replicate.delivery/yhqm/33MytZvSw6qmBJiE8J4kVNevUAr2cZuLalDKLhiVYcPYmctJA/out-0.webp",
      "https://replicate.delivery/yhqm/YqT3k2fXEekEc0Y7OIQ2f87X7YwxFSvRuqeaXcBN6fgiuEbbC/out-0.webp",
      // "https://replicate.delivery/yhqm/kyPeqr5fbJjVVEtFcc1FNaoRmQTlI4rMGXEujiIkKazDex2mA/out-0.webp",
      // "https://replicate.delivery/yhqm/u8ytQNN5qA7CCJfhrAZT66SFoLpY6X0voJsLgWhz2Cq7XwtJA/out-0.webp",
      // "https://replicate.delivery/yhqm/pLBcBpctn4JBBxZcugwo0wud8IZ9TN5LawwKbkk8yoTJM42E/out-0.webp",
      "https://replicate.delivery/yhqm/dfp8t0dGqvzPRSDywMQBnD0bzFgyJ1iDuvI2J4uWUZKOVstJA/out-0.webp",
    ];

    if (!output) throw new Error("no output");
    const imageuris = output as string[];

    let data: GenerationCreateManyInput[] = [];

    imageuris.forEach((uri) => {
      data.push({
        userId: user.id,
        url: uri,
        prompt: formData.prompt,
        aspectRatio: formData.aspectRatio,
        seed: formData.useSeed
          ? parseInt(formData.seed)
          : Math.floor(Math.random() * 1000000),
        inferenceSteps: 30,
        model: "black-forest-labs/flux-schnell",
      });
    });

    await prisma.generation.createMany({
      data: data,
    });

    revalidatePath("/create");
    const responseData = data.map((d) => ({
      url: d.url,
      prompt: d.prompt,
      aspectRatio: d.aspectRatio,
      model: d.model,
      isSaved: false,
    }));
    return { success: true, data: responseData };
  } catch (error) {
    return {
      success: false,
      message: "Failed to generate Images" + error,
      data: null,
    };
  }
};

export { generateImages };
