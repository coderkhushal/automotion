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
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
const prisma = new client_1.PrismaClient();
app.post("/hooks/catch/:userid/:motionid", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userid = req.params.userid;
        const motionId = req.params.motionid;
        // store in db a new trigger
        console.log(motionId);
        yield prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const run = yield tx.motionRun.create({
                data: {
                    motionId: motionId,
                    metadata: req.body.metadata,
                }
            });
            yield tx.motionRunOutbox.create({
                data: {
                    motionrunId: run.id,
                    metadata: req.body.metadata
                }
            });
        }));
        // push to kafka / redis
        res.json({ message: "webhook recieved" });
    }
    catch (er) {
        console.log(er);
        res.status(500).json({ message: "error" });
    }
}));
app.listen(3000, () => {
    console.log("hook listening on 3000");
});
