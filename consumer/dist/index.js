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
const kafkajs_1 = require("kafkajs");
const MailerService_1 = require("./services/MailerService");
const kafka = new kafkajs_1.Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
});
const consumer = kafka.consumer({ groupId: "demo" });
function consume() {
    return __awaiter(this, void 0, void 0, function* () {
        yield consumer.connect();
        yield consumer.subscribe({ topic: "kafka-task", fromBeginning: true });
        yield consumer.run({
            eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                var _b, _c;
                console.log(message);
                if ((_b = message.value) === null || _b === void 0 ? void 0 : _b.toString()) {
                    const value = JSON.parse((_c = message.value) === null || _c === void 0 ? void 0 : _c.toString());
                    switch (value.action.type.name) {
                        case "email":
                            try {
                                yield MailerService_1.MailerService.getInstance().sendMail(value.metadata.to, value.metadata.subject, value.metadata.text);
                            }
                            catch (err) {
                                console.log(err);
                            }
                            break;
                        default:
                            break;
                    }
                }
            })
        });
    });
}
consume();
