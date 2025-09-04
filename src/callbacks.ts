import https from "http"
import { CONFIG } from "./config"

function getWithCallback(url:string, callback:(err:Error | null, data?:string)=>void){
    https.get(url, (res)=>{
        let rawData = ""

        res.on("data", (chunks)=>{
            rawData+=chunks
        })

        res.on("end", ()=>{
            callback(null, rawData)
        })

        res.on("error", (err)=>{
            console.error(err)
        })
    }).on("error", (err)=>{
        console.error(err)
    })
}

export function fetchWeatherCallback(latitude:number, longitude:number, callback:(err:Error | null, data?:any)=>void){
    const url = `${CONFIG.WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    getWithCallback(url, (err, data)=>{
        if (err){
            return callback(err)
         }
       try{
            const parsed = JSON.parse(data!)
            callback(null, parsed)
       }catch(parsedErr){
            callback(parsedErr as Error)
        }
    })
}

export function fetchNewsCallback(limit: number, callback: (err: Error | null, data?: any) => void) {
    const url = `${CONFIG.NEWS_API}?limit=${limit}`;
  
    getWithCallback(url, (err, data) => {
      if (err) return callback(err);
  
      try {
        const parsed = JSON.parse(data!);
        callback(null, parsed);
      } catch (parseErr) {
        callback(parseErr as Error);
      }
    });
  }

  fetchWeatherCallback(CONFIG.DEFAULT_COORDS.latitude, CONFIG.DEFAULT_COORDS.longitude, (err, weather) => {
    if (err) {
      console.error("Weather error:", err);
    } else {
      console.log("Weather (Callback):", weather);
  
      fetchNewsCallback(CONFIG.NEWS_LIMIT, (err, news) => {
        if (err) {
          console.error("News error:", err);
        } else {
          console.log("News (Callback):", news);
        }
      });
    }
  });