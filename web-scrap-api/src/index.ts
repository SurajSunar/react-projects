import axios from "axios";
import * as cheerio from "cheerio";
import express, { json } from "express";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello from Express with TypeScript!");
});

app.post("/images", async (req, res) => {

  try {
    let {url }: {url: string} = req.body;

    url = url.at(-1) === '/' ? url.substring(0, url.length - 1) : url
    
    const data: any[] = [];

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const imageUrls: any[] = [];

    const addImage = (src: string | undefined, source: string) => {
      if (src && !src.startsWith("data:")) {
         imageUrls.push(
         {
            source,
            src: src.includes('http://') || src.includes('https://') ? src : `${url}${src}`
          }
        );
      }
       
    };
    // 1. Normal <img> tags
    $("img").each((_, el) => {
      addImage($(el).attr("src"), "img");
      addImage($(el).attr("srcset"), "img-srcset");
      addImage($(el).attr("data-src"), "img-data-src");
      addImage($(el).attr("data-lazy"), "img-data-lazy");
      addImage($(el).attr("data-original"), "img-data-original");
    });

    // 2. <source> inside <picture>
    $("source").each((_, el) => {
      addImage($(el).attr("srcset"), "source-srcset");
      addImage($(el).attr("data-srcset"), "source-data-srcset");
    });

    // 3. CSS background images
    $("[style]").each((_, el) => {
      const style = $(el).attr("style");
      const match =
        style && style.match(/background-image:\s*url\(['"]?(.*?)['"]?\)/);
      if (match) addImage(match[1], "css-background");
    });

    // 4. Open Graph
    $('meta[property="og:image"]').each((_, el) =>
      addImage($(el).attr("content"), "og:image")
    );

    // 5. Twitter image
    $('meta[name="twitter:image"]').each((_, el) =>
      addImage($(el).attr("content"), "twitter:image")
    );

    // 6. <link rel="image_src">
    $('link[rel="image_src"]').each((_, el) =>
      addImage($(el).attr("href"), "link-image_src")
    );

    // 7. JSON-LD structured image data
    $('script[type="application/ld+json"]').each((_, el) => {
      try {
        const json = JSON.parse($(el).html() as string);
        if (json.image) {
          if (Array.isArray(json.image))
            json.image.forEach((img) => addImage(img, "json-ld"));
          else addImage(json.image, "json-ld");
        }
      } catch {}
    });

    res.json({ data: imageUrls });
  } catch (error) {
    console.error("Error during scraping:", error);
    res.status(500).json({ error: "Failed to scrape images." });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
