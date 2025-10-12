import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  reactCompiler: true,
  experimental: {
    viewTransition: true,
    swcPlugins: [
      [
        "@swc-contrib/plugin-graphql-codegen-client-preset",
        { artifactDirectory: "./gql", gqlTagName: "graphql" },
      ],
    ],
    cacheComponents: true,
    authInterrupts: true,
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
