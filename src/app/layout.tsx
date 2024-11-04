import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/context/Providers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Photolic - AI Photo Generator",
  description:
    "Create stunning images from text with Photolic, the AI-powered photo generator. Transform your ideas into visuals effortlessly!",
  keywords: [
    "AI photo generator",
    "text to image",
    "image creation",
    "AI art generator",
    "generate images from text",
    "creative tools",
    "digital art",
  ],
  authors: { url: "https://itskv.me", name: "Karthikeya Veruturi" },
  viewport: "width=device-width, initial-scale=1.0",
  robots: "index, follow",
  openGraph: {
    title: "Photolic - AI Photo Generator",
    description:
      "Generate unique images from text prompts using Photolic's advanced AI technology. Ideal for artists, marketers, and creative minds.",
    url: "https://photolic.itskv.me",
    siteName: "Photolic",
    images: [
      {
        url: "https://photolic.itskv.me/og1.png",
        width: 1900,
        height: 970,
        alt: "Photolic image generation interface dashboard",
      },
      {
        url: "https://photolic.itskv.me/og2.png",
        width: 1900,
        height: 970,
        alt: "Image generation example using Photolic",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@karthikeyaspace",
    title: "Photolic - AI Photo Generator",
    description:
      "Turn your text into stunning images with Photolic's AI technology.",
    images: "https://photolic.itskv.me/og2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
