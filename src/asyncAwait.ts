import { CONFIG } from "./config";
import https from "https";

// ----------------------
function get(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let rawData = "";

        res.on("data", (chunk) => {
          rawData += chunk;
        });

        res.on("end", () => {
          resolve(rawData);
        });

        res.on("error", (err) => {
          reject(err);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

// ----------------------
export async function fetchWeatherAsync(latitude: number, longitude: number) {
  const url = `${CONFIG.WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
  const data = await get(url);
  return JSON.parse(data);
}

// ----------------------
export async function fetchNewsAsync(limit: number = CONFIG.NEWS_LIMIT) {
  const url = `${CONFIG.NEWS_API}?limit=${limit}`;
  const data = await get(url);
  return JSON.parse(data);
}

// ----------------------
(async () => {
  try {
    const weather = await fetchWeatherAsync(CONFIG.DEFAULT_COORDS.latitude, CONFIG.DEFAULT_COORDS.longitude);
    console.log("Weather (Async/Await):", weather);

    const news = await fetchNewsAsync(CONFIG.NEWS_LIMIT);
    console.log("News (Async/Await):", news);
  } catch (err) {
    console.error("Error fetching async data:", err);
  }
})();
