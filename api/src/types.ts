import { z } from "zod"

export const SignupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(6),
    email: z.string().email()
});

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const MotionCreateSchema = z.object({
    availableTriggerId: z.string(),
    triggerMetadata: z.any().optional(),
    actions: z.array(z.object({
        availableActionId: z.string(),
        Metadata: z.any().optional(),
        name: z.string()
    }))
});