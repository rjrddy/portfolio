import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every quality value we actually pass to <Image> — required starting in
    // Next.js 16, and silences the current dev warning. If you add a new
    // quality to any Image, add it here too.
    qualities: [78, 80, 88],
  },
};

export default nextConfig;
