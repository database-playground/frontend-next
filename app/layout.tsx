import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getAuthToken } from "@/lib/auth";
import { ApolloWrapper } from "@/providers/use-apollo";
import { PreloadResources } from "./preload-resources";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "資料庫練功坊",
  description: "AI 賦能的資料庫練習平台",
};

export const experimental_ppr = true;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getAuthToken();

  return (
    <html lang="zh-hant-tw">
      <head>
        <PreloadResources />

        <link
          rel="stylesheet"
          href="https://assets.dbplay.app/ibm-plex-sans-tc/css/ibm-plex-sans-tc-default-swap.min.css"
        />
      </head>
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-sans antialiased
        `}
      >
        <ApolloWrapper token={token}>
          {children}
        </ApolloWrapper>
        <Toaster />
      </body>
    </html>
  );
}
