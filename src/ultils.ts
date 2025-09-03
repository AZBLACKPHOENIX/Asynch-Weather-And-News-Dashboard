import { error } from "console";
import https from "https"
console.log("CHUNKS")
export function fetchWeather(latitude:number, longitude:number){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    console.log("CHUNKS")
    https.get(url, res=>{
        let rawData = ""
        res.on("data", chunks=>{
         
            console.log(chunks.toString().slice(0,50))
            rawData+= chunks

        })

        res.on("end",()=>{
            console.log("Data recieved")
            JSON.parse(rawData)
            console.log(rawData)
        })
    
        res.on("error",err=>{
            console.log(err)
        })

    })
}

export function fetchNews(limit:number=5){
    console.log("News")
    const url = `https://dummyjson.com/posts?limit=${limit}`;
    let rawData=""
    https.get(url, res=>{
        res.on("data",chunks=>
            rawData+=chunks
        
        )

        res.on("end", ()=>{
        try{
            const parsed = JSON.parse(rawData)
            console.log(parsed)
        }catch(err){
            console.log(err)
        }
        })

        res.on("error", err=>{
            console.log(err)
        })
    })
}

fetchWeather(-26.2041, 28.0473);
fetchNews(6)