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
exports.RedisPublisher = void 0;
const ioredis_1 = require("ioredis");
class RedisPublisher {
    constructor() {
        this.isConnected = false;
        this.BufferedData = [];
        this.publisher = new ioredis_1.Redis(process.env.REDIS_URL.toString());
        this.publisher.on("connect", () => {
            console.log("connected");
            this.isConnected = true;
            this.BufferedData.forEach((e) => {
                this.publishData(e);
            });
            this.BufferedData = [];
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new RedisPublisher();
        }
        return this.instance;
    }
    publishData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isConnected) {
                this.BufferedData.push(data);
                return;
            }
            yield this.publisher.lpush("AutomotionEvents", JSON.stringify(data));
        });
    }
}
exports.RedisPublisher = RedisPublisher;
