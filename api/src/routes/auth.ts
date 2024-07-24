
import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware";
import { SigninSchema, SignupSchema } from "../types";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { DbManager } from "../db";


const router = Router();
const prismaClient = DbManager.getInstance().getClient();
router.post("/signup", async (req: Request, res :Response) => {
    const body = req.body;
    const parsedData = SignupSchema.safeParse(body);

    if (!parsedData.success) {
        console.log(parsedData.error);
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            email: parsedData.data.username
        }
    });

    if (userExists) {
        return res.status(403).json({
            message: "User already exists"
        })
    }
    const hashedpass =  await bcryptjs.hash(parsedData.data.password, 10);

    await prismaClient.user.create({
        data: {
            email: parsedData.data.email,
            // TODO: Dont store passwords in plaintext, hash it
            
            password: hashedpass,
            name: parsedData.data.username
        }
    })

    // await sendEmail();

    return res.json({
        message: "Please verify your account by checking your email"
    });

})

router.post("/signin", async (req: Request, res :Response) => {
    const body = req.body;
    const parsedData = SigninSchema.safeParse(body);

    if (!parsedData.success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await prismaClient.user.findFirst({
        where:{
            email: parsedData.data.email
        }
    });

    
    if (!user) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    const isPasswordCorrect = await bcryptjs.compare(parsedData.data.password, user.password);

    if (!isPasswordCorrect) {
        return res.status(403).json({
            message: "Sorry credentials are incorrect"
        })
    }

    // sign the jwt
    const token = jwt.sign({
        id: user.id
    }, process.env.JWT_SECRET as string);

    res.json({
        token: token,
    });
})

router.get("/", authMiddleware, async (req: Request, res:Response) => {
    // TODO: Fix the type

    const id = (req as any).id;

    if(!id) {
        return res.status(403).json({
            message: "Unauthorized"
        });
    }
    
    const user = await prismaClient.user.findFirst({
        where: {
            id
        },
        select: {
            name: true,
            email: true
        }
    });

    return res.json({
        user
    });
})

export const userRouter = router;