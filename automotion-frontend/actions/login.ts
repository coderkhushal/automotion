"use client";

import * as z from "zod";
import { LoginSchema } from "@/schemas/index";
const BASE_URL =process.env.NEXT_PUBLIC_BASE_URL
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedSchemas = LoginSchema.safeParse(values);
  if (!validatedSchemas) return { error: "Invalid Fields!" };
  const res = await fetch(`${BASE_URL}/api/v1/user/signin`, {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data= await res.json()
  
  if(data.token){

    
    return { success: "Logged In Successfully!", token: data.token };
  }
  else{
    return { error: "Invalid Credentails!" };
  }
};