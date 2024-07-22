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
exports.KafkaConsumer = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: "my-app",
    brokers: ["localhost:9092"]
});
const consumer = kafka.consumer({ groupId: "my-app3" });
class KafkaConsumer {
    constructor() {
        this.isConnected = false;
        this.topic = "kafka-task";
        this.consumer = kafka.consumer({ groupId: "my-app3" });
        this.connectToKafka();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new KafkaConsumer();
        }
        return this.instance;
    }
    connectToKafka() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.connect();
            yield consumer.subscribe({
                topic: "kafka-task", fromBeginning: true
            });
            this.isConnected = true;
        });
    }
    consume() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.consumer.run({
                eachMessage: (_a) => __awaiter(this, [_a], void 0, function* ({ topic, partition, message }) {
                    var _b;
                    console.log({
                        partition,
                        offset: message.offset,
                        value: (_b = message === null || message === void 0 ? void 0 : message.value) === null || _b === void 0 ? void 0 : _b.toString(),
                    });
                }),
            });
        });
    }
}
exports.KafkaConsumer = KafkaConsumer;
