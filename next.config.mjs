/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_URL: process.env.BASE_URL,
    },
    images: {
        domains: [
            'scontent-pnq1-2.cdninstagram.com',
            'scontent.cdninstagram.com',
            "mydryfruit.s3.ap-northeast-1.amazonaws.com",
        ],
    },
}


export default nextConfig;
