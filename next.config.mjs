/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL || "https://47.129.37.248:3005"
    }
};

export default nextConfig;
