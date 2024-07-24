import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { userRouter } from "./routes/auth"
import { motionRouter } from "./routes/motion"
import { actionRouter } from "./routes/action"
import { triggerRouter } from "./routes/trigger"
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/motion",motionRouter)
app.use("/api/v1/action",actionRouter)
app.use("/api/v1/trigger",triggerRouter)
app.listen(3000, () => {
    console.log("Backend running on 3000")
} )