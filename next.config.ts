import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ['localhost', 'image.tmdb.org', 'themoviedb.org'],
    },
    experimental: {
    },
    // Configure all API routes to use Node.js runtime by default
    functions: {
        "api/*": {
            runtime: "nodejs",
        },
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"]
        });
        return config
    }
};

export default nextConfig;