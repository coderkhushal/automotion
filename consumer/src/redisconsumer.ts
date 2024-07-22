import { Redis } from "ioredis";
import { MailerService } from "./services/MailerService";

async function main() {

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