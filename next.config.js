const withOffline = require("next-offline");
const withPWA = require("next-pwa");

const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  target: "serverless",

  transformManifest: (manifest) => ["/"].concat(manifest), // add the homepage to the cache

  // Trying to set NODE_ENV=production when running yarn dev causes a build-time error so we turn on the SW in dev mode so that we can actually test it
  generateInDevMode: true,

  workboxOpts: {
    pwa: {
      dest: "public",
    },
    swDest: "static/service-worker.js",
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "https-calls",
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 30 * 24 * 60 * 60, // 1 month
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};

// module.exports = withOffline(nextConfig);
module.exports = withPWA(nextConfig);
