import { DbManager } from "../db";
import { Router } from "express";
const prismaClient = DbManager.getInstance().getClient()
const router = Router();

router.get("/available", async (req, res) => {
    const actions = await prismaClient.availableactions.findMany()
    return res.json({
        actions
    })
})
