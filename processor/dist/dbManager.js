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
exports.DbManager = void 0;
const client_1 = require("@prisma/client");
class DbManager {
    constructor() {
        this.client = new client_1.PrismaClient();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new DbManager();
        }
        return this.instance;
    }
    getClient() {
        return this.client;
    }
    getmotionRunOutBox(take) {
        return __awaiter(this, void 0, void 0, function* () {
            const motionrunOutBox = yield this.client.motionRunOutbox.findMany({
                take
            });
            yield this.client.motionRunOutbox.deleteMany({
                where: {
                    id: {
                        in: motionrunOutBox.map((e) => e.id)
                    }
                }
            });
            return motionrunOutBox;
        });
    }
    getmotionRunFromMotionrunOutbox(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.motionRun.findUnique({
                where: {
                    id: id
                }
            });
        });
    }
    getActionsForZap(motionId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.motion.findUnique({
                where: {
                    id: motionId
                },
                select: {
                    actions: {
                        select: {
                            type: {
                                select: {
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
        });
    }
}
exports.DbManager = DbManager;
