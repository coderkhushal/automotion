import { DbManager } from "../db";
import { Router } from "express";
const prismaClient = DbManager.getInstance().getClient()
const router = Router();

router.get("/available", async (req, res) => {
    const actions = await prismaClient.AvailableAction.findMany()
    return res.json({
        actions
    })
})
export { router as actionRouter }   