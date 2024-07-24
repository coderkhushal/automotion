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
const dbManager_1 = require("./dbManager");
require("dotenv").config();
const redisPublisher_1 = require("./redisPublisher");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/health", (req, res) => {
    res.status(200).send("working");
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        app.listen(8000, () => {
            console.log("listening on port 8000");
        });
        console.log("processing started");
        while (1) {
            try {
                let motionrunoutbox = yield dbManager_1.DbManager.getInstance().getmotionRunOutBox(10);
                motionrunoutbox.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    console.log("processing motionrun");
                    const motionrun = yield dbManager_1.DbManager.getInstance().getmotionRunFromMotionrunOutbox(e.motionrunId);
                    if (motionrun) {
                        const motion = yield dbManager_1.DbManager.getInstance().getMotion(motionrun.motionId);
                        if ((motion === null || motion === void 0 ? void 0 : motion.actions) && (motion === null || motion === void 0 ? void 0 : motion.actions.length) > 0) {
                            motion.actions.forEach((action) => __awaiter(this, void 0, void 0, function* () {
                                console.log("pushing action", action.type.name);
                                redisPublisher_1.RedisPublisher.getInstance().publishData({ action, metadata: Object.assign(Object.assign({}, action.actionmetadata), e.metadata) });
                                console.log("pushed");
                            }));
                        }
                    }
                }));
                yield new Promise(re => {
                    setTimeout(() => {
                        re("done");
                    }, 2000);
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    });
}
main();
