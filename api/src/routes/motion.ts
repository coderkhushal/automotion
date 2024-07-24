

import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { MotionCreateSchema } from "../types";
import { DbManager } from "../db";


const router = Router();
const prismaClient = DbManager.getInstance().getClient();
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    try {

        const id: string = (req as any).id;
        const body = req.body;
        const parsedData = MotionCreateSchema.safeParse(body);

        if (!parsedData.success) {
            return res.status(411).json({
                message: "Incorrect inputs"
            });

        }
        console.log(parsedData.data)

        const motionId = await prismaClient.$transaction(async (tx: any) => {
            const motion = await tx.motion.create({

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
                            actionmetadata: x.actionmetadata


                        }))
                    }
                },
                include: {
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
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })

    }
})

router.get("/", authMiddleware, async (req: Request, res: Response) => {

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
            },
            
        }
    });

    return res.json({
        motions
    })
})

router.get("/:motionId", authMiddleware, async (req: Request, res: Response) => {
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
router.delete("/:motionId", authMiddleware, async (req: Request, res: Response) => {
    try {

        const id = (req as any).id;
        const motionId = req.params.motionId;
        prismaClient.$transaction(async (tx: any) => {
            let motion = await tx.motion.findUnique({
                where: {
                    id: motionId,
                    userId: id
                }, include: {
                    actions: true,
                }
            })
            if (!motion) {
                return ;
            }
            await tx.action.deleteMany({
                where: {
                    id: {
                        in: motion.actions.map((x: any) => x.id)
                    }
                }
            })
            await tx.trigger.delete({
                where: {
                    id: motion.triggerId
                }
            })
            await tx.motion.delete({
                where: {
                    id: motionId
                }
            })
        })
        return res.json({
            message: "Motion deleted"
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
})

export const motionRouter = router;