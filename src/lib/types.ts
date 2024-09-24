interface SidebarFormTypes {
  model: "black-forest-labs/flux-schnell" | "black-forest-labs/flux-dev";
  prompt: string;
  numOutputs: number;
  outputQuality: number;
  outputFormat: "webp" | "png" | "jpg";
  aspectRatio: string;
  seed: number;
  disableSafetyChecker: boolean;
  useApiKey: boolean;
  apiKey?: string;
}

interface ImageResProps {
  id: string;
  url: string;
  prompt: string;
  aspectRatio: string;
  model: string;
  isSaved: boolean;
}

interface ImageDBType {
  userId: string;
  url: string;
  seed: number;
  prompt: string;
  aspectRatio: string;
  model: string;
  disableSafetyChecker: boolean;
}

export type { SidebarFormTypes, ImageResProps, ImageDBType };
