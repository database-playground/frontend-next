import type { Metadata } from "next";
import { Geist, Geist_Mono, IBM_Plex_Sans_JP } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/providers/use-user";
import ApolloProvider from "@/providers/use-apollo";

const ibmPlexSans = IBM_Plex_Sans_JP({
  variable: "--font-ibm-plex-sans",
  weight: ["300", "500", "700"],
});

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
          ${ibmPlexSans.variable}
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
