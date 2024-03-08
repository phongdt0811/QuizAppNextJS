/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL || "http://54.254.128.101:3005",
    }
};

export default nextConfig;
