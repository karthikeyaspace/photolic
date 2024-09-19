interface SidebarFormTypes {
  model: "flux-schnell";
  prompt: string;
  creativity: string;
  emotion: string;
  cameraPosition: string;
  place: string;
  numOutputs: number;
  outputQuality: number;
  outputFormat: "webp" | "png" | "jpg";
  aspectRatio: string;
  seed: number;
  disableSafetyChecker: boolean;
}

interface ImageResProps {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: string;
  model: string;
  isSaved: boolean;
}

interface GenerationCreateManyInput {
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

export type { SidebarFormTypes, ImageResProps, GenerationCreateManyInput };
