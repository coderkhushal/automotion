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
const dbManager_1 = require("./dbManager");
require("dotenv").config();
const redisPublisher_1 = require("./redisPublisher");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("processing started");
        while (1) {
            try {
                let motionrunoutbox = yield dbManager_1.DbManager.getInstance().getmotionRunOutBox(10);
                motionrunoutbox.forEach((e) => __awaiter(this, void 0, void 0, function* () {
                    const motionrun = yield dbManager_1.DbManager.getInstance().getmotionRunFromMotionrunOutbox(e.motionrunId);
                    if (motionrun) {
                        const zap = yield dbManager_1.DbManager.getInstance().getActionsForZap(motionrun.motionId);
                        if ((zap === null || zap === void 0 ? void 0 : zap.actions) && (zap === null || zap === void 0 ? void 0 : zap.actions.length) > 0) {
                            zap.actions.forEach((action) => __awaiter(this, void 0, void 0, function* () {
                                redisPublisher_1.RedisPublisher.getInstance().publishData({ action, metadata: e.metadata });
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
