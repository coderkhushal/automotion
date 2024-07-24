import { DbManager } from "../db";
import { Request, Response, Router } from "express";
const prismaClient = DbManager.getInstance().getClient()
const router = Router();

router.get("/available", async (req: Request, res: Response) => {
    const actions = await prismaClient.AvailableAction.findMany()
    return res.json({
        actions
    })
})
export { router as actionRouter }   