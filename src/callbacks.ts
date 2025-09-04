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