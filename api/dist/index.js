"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const motion_1 = require("./routes/motion");
const action_1 = require("./routes/action");
const trigger_1 = require("./routes/trigger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
app.use("/health", (req, res) => {
    res.status(200).json({ success: true });
});
app.use("/api/v1/user", auth_1.userRouter);
app.use("/api/v1/motion", motion_1.motionRouter);
app.use("/api/v1/action", action_1.actionRouter);
app.use("/api/v1/trigger", trigger_1.triggerRouter);
app.listen(3000, () => {
    console.log("Backend running on 3000");
});
