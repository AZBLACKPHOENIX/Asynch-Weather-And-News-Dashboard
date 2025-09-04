import https from "https"
import { CONFIG } from "./config"


function get(url:string):Promise<string>{
    return new Promise((resolve, reject)=>{
        https.get(url, (res)=>{
            let rawData=""
            res.on("data", chunks=>{
                rawData+= chunks
            })

            res.on("end",()=>{
                resolve(rawData)
            })

            res.on("error",(err)=>{
                reject(err)
            })
        }).on("error",(err)=>{
            reject(err)
        })
    })
}

console.log("PROMISE FUNCTION")
export function fetchWeatherPromise(latitude:number, longitude:number){
    const url = `${CONFIG.WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    return get(url).then(JSON.parse)
}       

export function fetchNewsPromise(limit:number= CONFIG.NEWS_LIMIT ){
        const url = `${CONFIG.NEWS_API}?limite=${limit}`
        return get(url).then(JSON.parse)
}

console.log("AWAIT FUNCTION")

export async function fetchWeatherAsync(latitude:number, longitude:number) {
    try{
        const url = `${CONFIG.WEATHER_API}&latitude=${latitude}&longitude=${longitude}`
        const data= await get(url)
        return JSON.parse(data)
    } catch(err){
        console.error(err)
        throw err
    }
}

export async function fetchNewsAsynch(limit= CONFIG.NEWS_LIMIT){
    try{
        const url = `${CONFIG.NEWS_API}?limite=${CONFIG.NEWS_LIMIT}`
        const data = await get(url)
        return JSON.parse(data)
    }catch (err){
        console.error(err)
        throw err
    }
}

