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
exports.KafkaManager = void 0;
const kafkajs_1 = require("kafkajs");
class KafkaManager {
    constructor() {
        this.isConnected = false;
        this.topic = "kafka-task";
        this.kafka = new kafkajs_1.Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092']
        });
        this.producer = this.kafka.producer();
        this.BufferedData = [];
        this.connectToKafka();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new KafkaManager();
        }
        return this.instance;
    }
    connectToKafka() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.producer.connect();
            this.isConnected = true;
            this.BufferedData.forEach((e) => {
                this.publishData(e);
            });
        });
    }
    publishData(data) {
        if (!this.isConnected) {
            this.BufferedData.push(data);
            return;
        }
        console.log("connected and sending");
        this.producer.send({
            topic: this.topic,
            messages: [{
                    value: JSON.stringify(data)
                }]
        });
    }
}
exports.KafkaManager = KafkaManager;
