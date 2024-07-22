import { Redis } from "ioredis";

export class RedisPublisher{
    private publisher : Redis
    private static instance : RedisPublisher
    private BufferedData: any[]
    private isConnected: boolean
    private constructor(){
        this.isConnected = false
        this.BufferedData =[]
        this.publisher = new Redis(process.env.REDIS_URL!.toString())
        this.publisher.on("connect", ()=>{
            console.log("connected")
            this.isConnected = true
            this.BufferedData.forEach((e)=>{
                this.publishData(e)
            })
            this.BufferedData =[]
        })
    }
    public static getInstance(){
        if(!this.instance){
            this.instance = new RedisPublisher()
        }
        return this.instance
    }
    public async publishData(data: any){
        if(!this.isConnected){
            this.BufferedData.push(data)
            return
        }
        
        await this.publisher.lpush("AutomotionEvents", JSON.stringify(data))
    }

}