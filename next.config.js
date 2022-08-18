/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

module.exports = {
    nextConfig,
    images: {
        domains: [
            "blog.api.cagtu.io",
            "thispersondoesnotexist.com",
            "picsum.photos",
            "172.16.16.70",
            "54.252.73.240",
        ],
    },
};
