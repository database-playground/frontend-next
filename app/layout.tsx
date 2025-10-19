import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ProgressProvider } from "@/providers/use-progress-provider";
import { PreloadResources } from "./preload-resources";

export const metadata: Metadata = {
  title: { template: "%s | 資料庫練功坊", default: "資料庫練功坊" },
  description: "AI 賦能的資料庫練習平台",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-hant-tw">
      <head>
        <PreloadResources />

        <link
          rel="stylesheet"
          href="https://assets.dbplay.app/ibm-plex-sans-tc/css/ibm-plex-sans-tc-default-swap.min.css"
        />
      </head>
      <body className={`font-sans antialiased`}>
        <ProgressProvider delay={500}>{children}</ProgressProvider>
        <Toaster />
      </body>
    </html>
  );
}
