"use client"
import CardWrapper from '@/components/web/auth/card_wrapper'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { RegisterSchema } from '@/schemas/index'
import { set, z } from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


import FormSuccess from '@/components/web/auth/form_success'
import FormError from '@/components/web/auth/form_error'

import { register } from '@/actions/register'

import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/context/AuthContext'
import { getSetToken } from '@/hooks/getSetToken'
import Social from '@/components/web/auth/social'
const RegisterPage = () => {

    const [error, seterror] = useState<string | undefined>(undefined)
    const [success, setsuccess] = useState<string | undefined>(undefined)
    const [Pending, setPending] = useState(false)
    const router= useRouter()
    const {fetchUser} = useAuthContext()

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            password: "",
            email: ""
        }
    })

    async function onSubmit(values: z.infer<typeof RegisterSchema>) {
        setsuccess("")
        seterror("")
        setPending(true)

        try {
            let result = await register({name: values.name ,email: values.email, password: values.password})
            seterror(result.error)
            setsuccess(result.success)
            setPending(false)
            if(result.success){
                getSetToken(result.token)
                await fetchUser();
                router.push("/auth/details")
            }

        }
        catch (err) {
            console.log(err)
            seterror(`Invalid Credentails`)
            setPending(false)
        }
    }
    return (
        <div className='h-full w-full bg-tertiary flex justify-center items-center'>
            <CardWrapper heading='Welcome back !' backbuttonhref='/auth/login' backbuttonlabel={`have an account?`}>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className='space-y-8'
                    >
                        <FormField
                            disabled={Pending}
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='John Doe'
                                            disabled={Pending}
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField

                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='JohnDoe@gmail.com'
                                            type='email'
                                            disabled={Pending}
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>

                            )}
                        />
                        <FormField

                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder='*****'
                                            type='password'
                                            disabled={Pending}
                                            {...field} />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <FormError message={error} />
                        <FormSuccess message={success} />
                       

                        
                        <Button type="submit" className='w-full bg-tertiary' variant={"secondary"} disabled={Pending}>Submit</Button>


                    </form>
                </Form>
            </CardWrapper>
        </div>
    )
}

export default RegisterPage