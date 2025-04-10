import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ['localhost', 'image.tmdb.org', 'themoviedb.org'],
    },
    experimental: {
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