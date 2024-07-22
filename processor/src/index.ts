import { DbManager } from "./dbManager";
require("dotenv").config()
import { RedisPublisher } from "./redisPublisher";


async function main() {
    
    console.log("processing started")
    while (1) {
        try{

            let motionrunoutbox = await DbManager.getInstance().getmotionRunOutBox(10)
            
        motionrunoutbox.forEach(async (e) => {
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