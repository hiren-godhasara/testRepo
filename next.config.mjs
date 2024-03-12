/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
        COPYRIGHT_YEAR: process.env.COPYRIGHT_YEAR,
        RAZOR_PAY_KEYID: process.env.RAZOR_PAY_KEYID
    },
    images: {
        domains: [
            'scontent-pnq1-2.cdninstagram.com',
            'scontent.cdninstagram.com',
            "mydryfruit.s3.ap-northeast-1.amazonaws.com",
            'example.com',
        ],
        minimumCacheTTL: 31536000,

    },
    reactStrictMode: false,
}


export default nextConfig;




