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
let loop = true;
app.get("/health", (req, res) => {
    loop = false;
    setTimeout(() => {
        loop = true;
        main()
    }, 5000);
    res.status(200).json({success:true})
})
async function main() {

    const client = new Redis(process.env.REDIS_URL!.toString())
    client.on("connect", () => {
        console.log("connnected to redis")
    }
    )
    while (loop) {
        try {

            const response: [string, string] | null = await client.brpop("AutomotionEvents", 5)
            if (!response) {
                continue;
            }
            console.log("received data")
            const data: { action: { type: { name: string } }, metadata: any } = JSON.parse(response[1])
            switch (data.action.type.name) {
                case "email":
                    console.log("sent to email service")
                    await MailerService.getInstance().sendMail(data.metadata.SMTP_USER, data.metadata.SMTP_PASS, data.metadata.SMTP_HOST, data.metadata.to, data.metadata.subject, data.metadata.text)
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
app.listen(8000, () => {

    console.log("listening on port 8000")
}
)
main()
