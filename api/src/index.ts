import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import { userRouter } from "./routes/auth"
import { motionRouter } from "./routes/motion"
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/motion",motionRouter)
app.listen(3000, () => {
    console.log("Backend running on 3000")
} )