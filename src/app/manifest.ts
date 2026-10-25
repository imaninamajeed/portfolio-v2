import type { MetadataRoute } from "next";

import { THEME_COLOR } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Imanina Majeed — Frontend & Product Engineer",
    short_name: "Imanina",
    description: "Frontend and product engineer building clear interfaces for complex data and workflows.",
    start_url: "/",
    display: "standalone",
    theme_color: THEME_COLOR.dark,
    background_color: THEME_COLOR.dark,
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
