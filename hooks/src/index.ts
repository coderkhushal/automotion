import express from "express"
import { PrismaClient } from "@prisma/client"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
const prisma = new PrismaClient()
app.get("/health", (req , res)=>{
    res.status(200).json({message: "working"})
})
app.post("/hooks/catch/:userid/:motionid", async (req, res) => {
    try {

        const userid = req.params.userid
        const motionId = req.params.motionid
        // store in db a new trigger
        console.log(motionId)

        await prisma.$transaction(async (tx: any): Promise<void> => {

            const run = await tx.motionRun.create({
                data: {
                    motionId: motionId,
                    metadata: req.body.metadata,

                }
            })

            await tx.motionRunOutbox.create({
                data: {
                    motionrunId: run.id,
                    metadata: req.body.metadata
                }
            })
        })
        // push to kafka / redis
        res.json({ message: "webhook recieved" })
    }
    catch (er) {
        console.log(er)
        res.status(500).json({ message: "error" })

    }
})

app.listen(3000, () => {
    console.log("hook listening on 3000")
})