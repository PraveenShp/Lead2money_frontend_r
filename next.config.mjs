/** @type {import('next').NextConfig} */

const nextConfig = {
    compress: true,
    optimizeFonts: true,
    //swcMinify:false,
    //assetPrefix : "http://localhost:3000",
    //distDir: 'build',
    crossOrigin: 'anonymous',
    experimental: {
        useLightningcss: true,
        cssChunking: 'strict'
    },  
};

export default nextConfig;