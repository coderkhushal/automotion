import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import cors from "cors"
import session from "cookie-session"
import { userRouter } from "./routes/auth"
import { motionRouter } from "./routes/motion"
import { actionRouter } from "./routes/action"
import { triggerRouter } from "./routes/trigger"
import { googleauthRouter } from "./routes/oauth"
const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use("/health", (req: Request, res: Response)=>{
    res.status(200).json({success: true})
})
app.use(session({
    name: 'session',
        keys: [process.env.SESSION_SECRET as string],
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      }));
app.use("/api/v1/user", userRouter)
app.use("/api/v1/motion",motionRouter)
app.use("/api/v1/action",actionRouter)
app.use("/api/v1/trigger",triggerRouter)
app.use("api/auth/callback/google", googleauthRouter)
app.listen(4000, () => {
    console.log("Backend running on 3000")
} )