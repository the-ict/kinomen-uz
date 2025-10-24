import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: {
    remotePatterns:[
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
};
const withNextIntl = createNextIntlPlugin({
  requestConfig: './src/shared/config/i18n/request.ts',
  experimental: {
    createMessagesDeclaration: './src/shared/config/i18n/messages/uz.json',
  },
});

export default withNextIntl(nextConfig);
