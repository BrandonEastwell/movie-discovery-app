import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ['localhost', 'image.tmdb.org', 'themoviedb.org'],
    },
    experimental: {
        serverComponentsExternalPackages: ["@prisma/client", "jsonwebtoken"],
    },
    // Configure all API routes to use Node.js runtime by default
    functions: {
        "api/*": {
            runtime: "nodejs",
        },
    },
};

export default nextConfig;