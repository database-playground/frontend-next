import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/providers/use-user";
import ApolloProvider from "@/providers/use-apollo";

// FIXME: move to CDN
import "@ibm/plex-sans-tc/css/ibm-plex-sans-tc-default.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Database Playground Admin",
  description: "Managing your Database Playground instance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-hant-tw">
      <body
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          font-sans
          antialiased
        `}
      >
        <ApolloProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
