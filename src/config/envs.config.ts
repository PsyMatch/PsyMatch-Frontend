import 'dotenv/config';

export const envs = {
    api_url: process.env.API_URL ?? 'http://localhost:3000',
    next_public_api_url: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000',
};
