import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RK STEEL CO - Noida",
    short_name: "RK STEEL",
    description:
      "Noida's premier stockist & authorised dealer of Tata Tiscon, Tata Structura, Tata Durashine, Tata Kosh, SAIL, JSW, Jindal, and APL Apollo.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#dc2626",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
