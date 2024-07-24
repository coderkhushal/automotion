
import { Router } from "express";
import { DbManager } from "../db";
const prismaClient = DbManager.getInstance().getClient()

const router = Router();

router.get("/available", async (req, res) => {
    const availableTriggers = await prismaClient.AvailableTrigger.findMany({});
    res.json({
        availableTriggers
    })
});

export const triggerRouter = router;