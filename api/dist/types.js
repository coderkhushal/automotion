"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailActionSchema = exports.MotionCreateSchema = exports.SigninSchema = exports.SignupSchema = void 0;
const zod_1 = require("zod");
exports.SignupSchema = zod_1.z.object({
    username: zod_1.z.string().min(5),
    password: zod_1.z.string().min(6),
    email: zod_1.z.string().email()
});
exports.SigninSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string()
});
exports.MotionCreateSchema = zod_1.z.object({
    availableTriggerId: zod_1.z.string(),
    triggerMetadata: zod_1.z.any().optional(),
    actions: zod_1.z.array(zod_1.z.object({
        availableActionId: zod_1.z.string(),
        actionmetadata: zod_1.z.record(zod_1.z.any()),
        name: zod_1.z.string()
    }))
});
exports.EmailActionSchema = zod_1.z.object({
    SMTP_USER: zod_1.z.string(),
    SMTP_PASS: zod_1.z.string(),
    SMTP_HOST: zod_1.z.string(),
});
