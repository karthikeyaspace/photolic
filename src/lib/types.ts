interface SidebarFormTypes {
  model: "black-forest-labs/flux-schnell" | "black-forest-labs/flux-dev";
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

export type { SidebarFormTypes, ImageResProps };
