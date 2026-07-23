import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Núi Bà Đen – Vé Cáp Treo",
    short_name: "Núi Bà Đen",
    description: "Đặt vé cáp treo, xem lịch hoạt động và khám phá Núi Bà Đen.",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f6f2",
    theme_color: "#0b5a43",
    orientation: "portrait",
    categories: ["travel", "lifestyle"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
