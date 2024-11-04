import { type MetadataRoute } from "next";

const url = process.env.VERCEL_URL;
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `https://${url}/sitemap.xml`,
  };
}
