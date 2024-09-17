interface SidebarFormTypes {
  prompt: string;
  creativity: string;
  filmType: string;
  emotion: string;
  cameraPosition: string;
  place: string;
  numOutputs: number;
  aspectRatio: string;
  useSeed: boolean;
  seed: string;
}

interface ImageResProps {
  url: string;
  prompt: string;
  aspectRatio: string;
  model: string;
  isSaved: boolean;
}

export type { SidebarFormTypes, ImageResProps };
