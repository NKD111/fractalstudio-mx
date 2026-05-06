import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url:              "https://www.fractalstudio.com.mx",
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         1,
    },
    {
      url:              "https://www.fractalstudio.com.mx/#servicios",
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.8,
    },
    {
      url:              "https://www.fractalstudio.com.mx/#portafolio",
      lastModified:     new Date(),
      changeFrequency:  "weekly",
      priority:         0.9,
    },
    {
      url:              "https://www.fractalstudio.com.mx/#contacto",
      lastModified:     new Date(),
      changeFrequency:  "monthly",
      priority:         0.7,
    },
  ];
}
