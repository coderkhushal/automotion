"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const node_schedule_1 = __importDefault(require("node-schedule"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
let loop = true;
app.get("/health", (req, res) => {
    loop = false;
    setTimeout(() => {
        loop = true;
        main();
    }, 5000);
    res.status(200).json({ success: true });
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // const client = new Redis(process.env.REDIS_URL!.toString())
        // client.on("connect", () => {
        //     console.log("connnected to redis")
        // }
        // )
        node_schedule_1.default.scheduleJob('*/5 * * * * *', function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    console.log("running");
                    // const response: [string, string] | null = await client.brpop("AutomotionEvents", 5)
                    // if (!response) {
                    //     return;
                    // }
                    // console.log("received data")
                    // const data: { action: { type: { name: string } }, metadata: any } = JSON.parse(response[1])
                    // switch (data.action.type.name) {
                    //     case "email":
                    //         console.log("sent to email service")
                    //         await MailerService.getInstance().sendMail(data.metadata.SMTP_USER, data.metadata.SMTP_PASS, data.metadata.SMTP_HOST, data.metadata.to, data.metadata.subject, data.metadata.text)
                    //         break;
                    //     default:
                    //         break
                    // }
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
    });
}
app.listen(8000, () => {
    console.log("listening on port 8000");
});
main();
