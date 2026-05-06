import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://www.fractalstudio.com.mx/sitemap.xml",
    host:    "https://www.fractalstudio.com.mx",
  };
}
