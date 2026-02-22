import type { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(req: VercelRequest, res: VercelResponse) {
    const baseUrl = "https://duoyin-v2-cdii.vercel.app";

    const urls = [
        {
            loc: "/",
            changefreq: "daily",
            priority: "1.0",
        },
        {
            loc: "/overview",
            changefreq: "weekly",
            priority: "0.8",
        },
        {
            loc: "/notebook",
            changefreq: "weekly",
            priority: "0.8",
        },
        {
            loc: "/practice",
            changefreq: "weekly",
            priority: "0.8",
        },
        {
            loc: "/video",
            changefreq: "weekly",
            priority: "0.8",
        },
    ];

    const today = new Date().toISOString().split("T")[0];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls
            .map(
                (url) => `
    <url>
        <loc>${baseUrl}${url.loc}</loc>
        <lastmod>${today}</lastmod>
        <changefreq>${url.changefreq}</changefreq>
        <priority>${url.priority}</priority>
    </url>`
            )
            .join("")}
    </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "no-store");

    return res.status(200).send(sitemap);
}