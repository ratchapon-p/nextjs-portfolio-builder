'use client'
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import userGlobalStore, { IuserGlobalStore } from "@/global-store/users-store";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { addNewExperience, editExperienceById } from "@/actions/experiences";

interface ExperienceFormProps {
    initialValues: any
    formType: 'add' | 'edit'
}

function ExperienceForm({initialValues, formType}: ExperienceFormProps) {
    const router = useRouter()
    const {user} = userGlobalStore() as IuserGlobalStore
    const [loading, setLoading] = useState(false)
    
    const formSchema = z.object({
      company: z.string().nonempty().min(3).max(50),
      role: z.string().nonempty(),
      start_date: z.string().nonempty(),
      end_date: z.string().nonempty(),
      description: z.string().nonempty(),
      location: z.string(),
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        company: initialValues?.company || "",
        role: initialValues?.role || "",
        start_date: initialValues?.start_date || "",
        end_date: initialValues?.end_date || "",
        description: initialValues?.description || "",
        location: initialValues?.location || "",
      },
    })
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      try {
        setLoading(true)
        const payload : any = {...values}

        payload.user_id = user?.id
        let response : any = null;
        console.log(payload,'<<payload');
        
        if(formType === 'add'){
          response = await addNewExperience(payload)
        }else{
          response = await editExperienceById(initialValues.id, payload)
        }
  
        if(response.success){
          router.push("/account/experiences")
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
          <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-7">

            <div className="grid grid-cols-2 gap-5">

              <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                      <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                      <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

            </div>

            <div className="grid grid-cols-3 gap-5">

              <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                      <Input type="date" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                      <Input type="date" placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

              <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Location</FormLabel>
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
                  name="description"
                  render={({ field }) => (
                  <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                      <Textarea placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                  )}
              />

              
              <div className="flex justify-end gap-5">
                  <Button disabled={loading} className="cursor-pointer" type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
                  <Button disabled={loading} className="cursor-pointer" type="submit">save</Button>
              </div>
          </form>
      </Form>
      </div>
    )
}

export default ExperienceForm