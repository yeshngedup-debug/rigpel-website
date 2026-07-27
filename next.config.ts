import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.19.1"],
  serverExternalPackages: ["@node-rs/argon2"],
};

export default nextConfig;
