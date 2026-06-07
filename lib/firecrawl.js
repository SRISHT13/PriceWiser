import FirecrawlApp from "@mendable/firecrawl-js";

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

export async function scrapeProduct(url) {
  try {
    const result = await firecrawl.scrapeUrl(url, {
      formats: [
        {
          type: "json",                         // ✅ v2 correct format
          prompt:
            "Extract the product name, current price as a number, currency code (use INR for Indian rupee ₹, USD, EUR etc), and product image URL",
          schema: {
            type: "object",
            properties: {
              productName: { type: "string" },
              currentPrice: { type: "number" },
              currencyCode: { type: "string" },
              productImageUrl: { type: "string" },
            },
            required: ["productName", "currentPrice"],
          },
        },
      ],
    });

    console.log("RAW result:", JSON.stringify(result, null, 2)); // keep for debugging

    const extractedData = result?.json;           // ✅ v2 returns result.json

    if (!extractedData?.productName || !extractedData?.currentPrice) {
      throw new Error("Could not find product name or price");
    }

    return extractedData;
  } catch (error) {
    console.error("Firecrawl scrape error:", error);
    throw new Error(`Failed to scrape product: ${error.message}`);
  }
}