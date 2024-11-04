import withLinaria from "next-with-linaria";

/** @type {import('next').NextConfig} */
const config = {
  async headers() {
    const headers = [];
    if (process.env.VERCEL_ENV !== 'production') {
      headers.push({
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex'
          }
        ]
      });
    }
    return headers;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/configuracao",
        permanent: true,
      },
    ];
  },
};

export default withLinaria(config);
