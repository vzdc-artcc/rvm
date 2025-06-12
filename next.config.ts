import config from './package.json' with {type: 'json'};
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone',
    publicRuntimeConfig: {
        version: config.version,
    },
};

export default nextConfig;
