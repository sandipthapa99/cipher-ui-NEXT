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
            "172.16.16.96",
            "172.16.16.48",
            "172.16.16.88",
            "172.16.16.43",
            "172.16.16.46",
            "172.16.16.43",
            "172.16.16.200",
            "172.16.16.123",
            "openweathermap.org",
        ],
    },
};
