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
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = require("ioredis");
const MailerService_1 = require("./services/MailerService");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new ioredis_1.Redis(process.env.REDIS_URL.toString());
        client.on("connect", () => {
            console.log("connected");
        });
        while (1) {
            try {
                const response = yield client.brpop("AutomotionEvents", 0);
                if (!response) {
                    continue;
                }
                console.log("received data");
                const data = JSON.parse(response[1]);
                switch (data.action.type.name) {
                    case "email":
                        console.log("sent to email service");
                        MailerService_1.MailerService.getInstance().sendMail(data.metadata.to, data.metadata.subject, data.metadata.text);
                        break;
                    default:
                        break;
                }
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
main();
