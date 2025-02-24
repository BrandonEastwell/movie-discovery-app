import {NextConfig} from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
    images: {
        domains: ['localhost', 'image.tmdb.org', 'themoviedb.org'],
    },
};

export default nextConfig;