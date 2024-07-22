import { PrismaClient } from "@prisma/client"

export class DbManager{
    private static instance : DbManager
    private client : PrismaClient
    private constructor(){
        this.client = new PrismaClient()
    }
    public static getInstance(){
        if(!this.instance){
            this.instance= new DbManager()
        }
        return this.instance
    }
    public getClient(){
        return this.client
    }
    async getmotionRunOutBox(take: number){
        const motionrunOutBox = await this.client.motionRunOutbox.findMany({
            take
        }) 
        await this.client.motionRunOutbox.deleteMany({
            where:{
                id:{
                    in: motionrunOutBox.map((e : any)=>e.id)
                }
            }
        })
        return motionrunOutBox
    }
    async getmotionRunFromMotionrunOutbox(id: string){
        return await this.client.motionRun.findUnique({
            where:{
                id: id
            }
        })
    }
    async getActionsForZap(motionId: string){
        return await this.client.motion.findUnique({
            where:{
                id: motionId
            }, 
            select:{
                actions: {
                    select:{
 
                        type: {
                            select:{
                                name: true
                            }
                        }
                    }
                }
            }
        })
    }
}