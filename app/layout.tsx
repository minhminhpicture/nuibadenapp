import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-app",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nui-ba-den-mobile.vercel.app"),
  title: "Núi Bà Đen – Vé Cáp Treo Tây Ninh",
  description: "Ứng dụng đặt vé cáp treo, xem lịch vận hành và khám phá Núi Bà Đen.",
  manifest: "/manifest.webmanifest",
  applicationName: "Núi Bà Đen",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Núi Bà Đen",
  },
  formatDetection: { telephone: true },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    title: "Núi Bà Đen – Vé Cáp Treo Tây Ninh",
    description: "Đặt vé QR, xem lịch vận hành và khám phá các tuyến cáp trong một ứng dụng.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ứng dụng vé cáp treo Núi Bà Đen" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Núi Bà Đen – Vé Cáp Treo Tây Ninh",
    description: "Đặt vé QR, xem lịch vận hành và khám phá các tuyến cáp trong một ứng dụng.",
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#0b5a43",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body className={beVietnam.variable}>{children}</body>
    </html>
  );
}
