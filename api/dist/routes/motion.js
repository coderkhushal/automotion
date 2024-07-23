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
exports.motionRouter = void 0;
const express_1 = require("express");
const middleware_1 = require("../middleware");
const types_1 = require("../types");
const db_1 = require("../db");
const router = (0, express_1.Router)();
const prismaClient = db_1.DbManager.getInstance().getClient();
router.post("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const body = req.body;
    const parsedData = types_1.MotionCreateSchema.safeParse(body);
    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }
    const motionId = yield prismaClient.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const motion = yield tx.motion.create({
            data: {
                userId: parseInt(id),
                triggerId: "",
                trigger: {
                    create: {
                        triggerMetadata: parsedData.data.triggerMetadata,
                        type: {
                            connect: {
                                id: parsedData.data.availableTriggerId
                            }
                        }
                    }
                },
                actions: {
                    create: parsedData.data.actions.map((x, index) => ({
                        actionId: x.availableActionId,
                        sortingOrder: index,
                        name: x.name,
                    }))
                }
            },
            include: {
                trigger: true
            }
        });
        yield tx.motion.update({
            where: {
                id: motion.id
            },
            data: {
                triggerId: motion.trigger.id
            }
        });
        return motion.id;
    }));
    return res.json({
        motionId
    });
}));
router.get("/", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // @ts-ignore
    const id = req.id;
    const motions = yield prismaClient.motion.findMany({
        where: {
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        motions
    });
}));
router.get("/:motionId", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.id;
    const motionId = req.params.motionId;
    const motion = yield prismaClient.motion.findFirst({
        where: {
            id: motionId,
            userId: id
        },
        include: {
            actions: {
                include: {
                    type: true
                }
            },
            trigger: {
                include: {
                    type: true
                }
            }
        }
    });
    return res.json({
        motion
    });
}));
exports.motionRouter = router;
