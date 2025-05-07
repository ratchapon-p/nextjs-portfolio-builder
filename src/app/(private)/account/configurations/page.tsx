'use client'
import React, { useEffect, useMemo, useState } from "react";
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
import { uploadFileAndGetUrl } from "@/helpers/uploads";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { addNewProject, editProjectById } from "@/actions/projects";import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { addNewSkill, editSkillById } from "@/actions/skills";
import { Checkbox } from "@/components/ui/checkbox";
import { getConfiguration, saveConfiguration } from "@/actions/configurations";

function ConfigurationsPage() {
  const {user} = userGlobalStore() as IuserGlobalStore
  const [initialValues, setInitialValues] = useState<any>({
    show_educations : true,
    show_percentage_in_educations : true,
    show_skill_icons : true,
    show_skills_level : true,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

    const formSchema = z.object({
      show_educations: z.boolean(),
      show_percentage_in_educations: z.boolean(),
      show_skill_icons: z.boolean(),
      show_skills_level: z.boolean(), 
    })
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        show_educations: initialValues?.show_educations || false,
        show_percentage_in_educations: initialValues?.show_percentage_in_educations || false,
        show_skill_icons: initialValues?.show_skill_icons || false,
        show_skills_level: initialValues?.show_skills_level || false,
      },
    })

    useEffect(() =>{
      fetchConfiguration()
    },[])

    const onSubmit = async(data : any) => {
      try {
        setLoading(true)
        const response: any = await saveConfiguration({payload: {...data,user_id : user?.id}, userId : user?.id!})
      
        if(response.success){
          toast.success(response.message)
        }else{
          toast.error(response.message)
        }
      
      
      } catch (error : any) {
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }

    const fetchConfiguration = async() =>{
      setLoading(true)
      try {
        const response : any = await getConfiguration(user?.id!)
        if (response.success) {
          setInitialValues(response.data)
          form.reset(response.data )
        }else{
          toast.error(response.message)
        }
      }catch(error: any){
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }

  return (
    <div className="p-5 flex flex-col gap-4 font-bold">
      <h1>Configuration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 mt-7">
            <FormField
                control={form.control}
                name="show_educations"
                render={({ field }) => (
                <FormItem className="flex item-center gap-5">
                    <FormLabel>Show Educations</FormLabel>
                    <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="show_percentage_in_educations"
                render={({ field }) => (
                <FormItem className="flex item-center gap-5">
                    <FormLabel>Show Percentage Education</FormLabel>
                    <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="show_skill_icons"
                render={({ field }) => (
                <FormItem className="flex item-center gap-5">
                    <FormLabel>Show Skill Icons</FormLabel>
                    <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="show_skills_level"
                render={({ field }) => (
                <FormItem className="flex item-center gap-5">
                    <FormLabel>Show Skills Level</FormLabel>
                    <FormControl>
                    <Checkbox 
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="flex justify-end gap-5">
                {/* <Button disabled={loading} className="cursor-pointer" type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button> */}
                <Button disabled={loading} className="cursor-pointer" type="submit">save</Button>
            </div>
        </form>
    </Form>
    </div>
  )
}

export default ConfigurationsPage