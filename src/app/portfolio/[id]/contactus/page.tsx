'use client'

import React, { useState } from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useParams } from 'next/navigation';
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { addNewQuery } from '@/actions/queries';



function PortfolioContactUs() {
  const [loading, setLoading] = useState(false)
  const params = useParams()

  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    email: z.string().nonempty().email(),
    message: z.string().nonempty(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  const onSubmit = async(data : any) => {
    try {
      setLoading(true)
      const response : any = await addNewQuery({
        ...data,user_id: params.id
      })
      if(response.success){
        form.reset()
        toast.success(response.message)
      }else{
        toast.error(response.error)
      }
    } catch (error : any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className='my-7 text-2xl font-bold text-primary'>Contact Us</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-7">
          <div className="grid grid-cols-2 gap-5">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                    <Input placeholder="" {...field} />
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
                    <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

          </div>
                     <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                    <Textarea placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <div className="flex justify-end gap-5">
                <Button disabled={loading} className="cursor-pointer" type="submit">save</Button>
            </div>
        </form>
    </Form>
    </div>
  )
}

export default PortfolioContactUs