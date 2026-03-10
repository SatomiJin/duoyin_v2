import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
  // Determine the base URL dynamically from the request headers
  const host = req.headers.host ? `https://${req.headers.host}` : "";

  const urls = [
    { loc: "/", changefreq: "daily", priority: "1.0" },
    { loc: "/overview", changefreq: "weekly", priority: "0.8" },
    { loc: "/notebook", changefreq: "weekly", priority: "0.8" },
    { loc: "/practice", changefreq: "weekly", priority: "0.8" },
    { loc: "/video", changefreq: "weekly", priority: "0.8" },
  ];

  const today = "2024-01-01";

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
    .map(
      (url) => `  <url>
    <loc>${host}${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  // Allow caching by crawlers but force revalidation after a day
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
  return res.status(200).send(sitemap);
}