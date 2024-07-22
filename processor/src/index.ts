import { DbManager } from "./dbManager";
require("dotenv").config()
import { RedisPublisher } from "./redisPublisher";
import bodyParser from "body-parser";
import cors from "cors"
import Express from "express"
const app = Express()

app.use(Express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/health", (req, res)=>{
    res.status(200).send("working")
})
async function main() {

    app.listen( 8000, ()=>{
        console.log("listening on port 8000")
    })
    console.log("processing started")
    while (1) {
        try{

            let motionrunoutbox = await DbManager.getInstance().getmotionRunOutBox(10)
            
        motionrunoutbox.forEach(async (e) => {
            console.log("processing motionrun")
            const motionrun = await DbManager.getInstance().getmotionRunFromMotionrunOutbox(e.motionrunId)
            
            if (motionrun) {
                
                const zap = await DbManager.getInstance().getActionsForZap(motionrun.motionId)
                if(zap?.actions && zap?.actions.length>0){
                    zap.actions.forEach(async(action)=>{
                    RedisPublisher.getInstance().publishData({action , metadata: e.metadata})
                    
                })
                }    
            }
        })
        await new Promise(re => {
            setTimeout(() => {
                re("done")
            }, 2000);
        })
    }
    catch(err){
        console.log(err)
    }
        
    }
}
main()