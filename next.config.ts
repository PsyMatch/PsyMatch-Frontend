import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    images: {
        domains: ['ui-avatars.com', 'example.com', 'res.cloudinary.com', 'lh3.googleusercontent.com'],
    },
    // ESLint se ejecutará durante la build para asegurar calidad y evitar errores en CI.
};

export default nextConfig;
