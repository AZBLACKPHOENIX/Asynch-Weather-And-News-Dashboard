import { CONFIG } from "./config";
import { fetchWeatherCallback } from "./callbacks";
import { fetchWeatherPromise } from "./promiseVesion";
import { fetchWeatherAsync } from "./asyncAwait";

console.log("\n=== CALLBACK STYLE ===");
fetchWeatherCallback(CONFIG.DEFAULT_COORDS.latitude, CONFIG.DEFAULT_COORDS.longitude, (err, data) => {
  if (err) {
    console.error("Callback error:", err);
  } else {
    console.log("Callback weather:", data);
  }
});


console.log("\n=== PROMISE STYLE ===");
fetchWeatherPromise(CONFIG.DEFAULT_COORDS.latitude, CONFIG.DEFAULT_COORDS.longitude)
  .then((data) => {
    console.log("Promise weather:", data);
  })
  .catch((err) => {
    console.error("Promise error:", err);
  });



console.log("\n=== ASYNC/AWAIT STYLE ===");
(async () => {
  try {
    const data = await fetchWeatherAsync(CONFIG.DEFAULT_COORDS.latitude, CONFIG.DEFAULT_COORDS.longitude);
    console.log("Async/Await weather:", data);
  } catch (err) {
    console.error("Async/Await error:", err);
  }
})();
