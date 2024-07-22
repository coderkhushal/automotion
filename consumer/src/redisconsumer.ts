import { Redis } from "ioredis";
import { MailerService } from "./services/MailerService";
import bodyParser from "body-parser";
import cors from "cors"
import Express from "express"
const app = Express()

app.use(Express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.get("/health", (req, res) => {
    res.status(200).send("working"
    )
})
async function main() {
    app.listen(8000, () => {
        console.log("listening on port 8000")
    }
    )
    const client = new Redis(process.env.REDIS_URL!.toString())
    client.on("connect", () => {
        console.log("connected")
    }
    )
    while (1) {
        try {

            const response: [string, string] | null = await client.brpop("AutomotionEvents", 0)
            if (!response) {
                continue;
            }
            console.log("received data")
            const data: { action: { type: { name: string } }, metadata: any } = JSON.parse(response[1])
            switch (data.action.type.name) {
                case "email":
                    console.log("sent to email service")
                    MailerService.getInstance().sendMail(data.metadata.to, data.metadata.subject, data.metadata.text)
                    break;
                default:
                    break
            }
        }
        catch (err) {
            console.log(err)
        }

    }
}
main()