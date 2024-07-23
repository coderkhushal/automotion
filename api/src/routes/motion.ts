

import { Router } from "express";
import { authMiddleware } from "../middleware";
import { MotionCreateSchema } from "../types";
import { DbManager } from "../db";

const router = Router();
const prismaClient = DbManager.getInstance().getClient();
router.post("/", authMiddleware, async (req, res) => {
    
    const id: string = (req as any).id;
    const body = req.body;
    const parsedData = MotionCreateSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const motionId = await prismaClient.$transaction(async (tx: any) => {
        const motion = await tx.motion.create({
            data: {
                userId: parseInt(id),
                triggerId:"",
                trigger:{
                    create: {
                        
                        triggerMetadata: parsedData.data.triggerMetadata,
                        type:{
                            connect:{
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
            include:{
                trigger: true
            }
        })
       
       

        await tx.motion.update({
            where: {
                id: motion.id
            },
            data: {
                triggerId: motion.trigger.id
            }
        })

        return motion.id;

    })
    return res.json({
        motionId
    })
})

router.get("/", authMiddleware, async (req, res) => {
    
    const id = (req as any).id;
    const motions = await prismaClient.motion.findMany({
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
    })
})

router.get("/:motionId", authMiddleware, async (req, res) => {
    //@ts-ignore
    const id = req.id;
    const motionId = req.params.motionId;

    const motion = await prismaClient.motion.findFirst({
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
    })

})

export const motionRouter = router;