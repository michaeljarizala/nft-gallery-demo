/** @type {import('next').NextConfig} */

import path from "path"
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  reactStrictMode: false,
  webpack: (config, options) => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['layout'] = path.join(__dirname, 'layout')
    return config
  },
  images: {
    domains: [
      "picsum.photos",
      "violet-stormy-marsupial-254.mypinata.cloud",
      "gold-wonderful-cheetah-826.mypinata.cloud",
    ]
  }
};

export default nextConfig;
