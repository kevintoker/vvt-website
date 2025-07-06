import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import { GlobalLoadingProvider } from "@/components/global-loading-provider";
import { PageFade } from "@/components/page-fade";
import { RouteFadeOverlayProvider } from "@/components/route-fade-overlay-context";
import { RouteFadeOverlay } from "@/components/route-fade-overlay";
// ...other imports...


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Valorant at Virginia Tech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,700&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen">
          <RouteFadeOverlayProvider>
            <RouteFadeOverlay />
            <GlobalLoadingProvider>
            <PageFade>
              <Navbar />
              {children}
            </PageFade>
            </GlobalLoadingProvider>
          </RouteFadeOverlayProvider>
      </body>
    </html>
  );
}
