
import { Request, Response, Router } from "express";
import { DbManager } from "../db";
const prismaClient = DbManager.getInstance().getClient()

const router = Router();

router.get("/available", async (req:Request, res: Response) => {
    const availableTriggers = await prismaClient.AvailableTrigger.findMany({});
    res.json({
        availableTriggers
    })
});

export const triggerRouter = router;