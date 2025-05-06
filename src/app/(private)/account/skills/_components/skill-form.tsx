'use client'
import React, { useMemo, useState } from "react";
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


interface ISkillFromProps {
    formType: 'add' | 'edit',
    initialValues ? : any,
    openSkillForm : boolean,
    setOpenSkillForm : (open : boolean) => void,
    reloadData : () => void,
    setInitialValues : (initialValues : any) => void
}

function SkillForm({formType, initialValues, openSkillForm, setOpenSkillForm, reloadData ,setInitialValues} : ISkillFromProps) {
  const {user} = userGlobalStore() as IuserGlobalStore
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  
  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    level: z.string(),
    image: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      level: initialValues?.level || 0,
      image: initialValues?.image || "",
    },
  })
console.log(initialValues,'<<initialValues');

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const payload : any = {...values}

      if(selectedFile){
        payload.image = await uploadFileAndGetUrl(selectedFile)
      }
      payload.user_id = user?.id
      let response : any = null;

      if(formType === 'add'){
        response = await addNewSkill(payload)
      }else{
        response = await editSkillById(initialValues.id, payload)
      }

      if(response.success){
        setOpenSkillForm(false)
        reloadData()
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

  const skillImagePreview = useMemo(() =>{
    if(selectedFile){
      return URL.createObjectURL(selectedFile)
    }
    return initialValues?.image || ""
  },[selectedFile])

  const onClickCancel = () => {
    setOpenSkillForm(false)
    setInitialValues(null)
  }

  return (
    <div>
      <Dialog
        open={openSkillForm}
        onOpenChange={(open) => {
          setOpenSkillForm(open)
          if (!open) {
            setInitialValues(null)  
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{formType === 'add' ? 'Add New Skill' : 'Edit Skill'}</DialogTitle>
          </DialogHeader>
                    <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-7">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="level"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter you tech stack used in the project eg. React, Node, Express, MySQL" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                <Input 
                                    type="file"
                                    onChange={(e) =>{
                                    setSelectedFile(e.target.files![0])
                                    }}
                                    className="w-max"
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
            
                        {skillImagePreview && (
                            <div className="p-2 border rounded w-max">
                            <img src={skillImagePreview} alt="hero image" className="w-32 h-32 rounded" />
                            </div>
                        )}
                        <div className="flex justify-end gap-5">
                            <Button disabled={loading} className="cursor-pointer" type="button" variant="secondary" onClick={() => onClickCancel()}>Cancel</Button>
                            <Button disabled={loading} className="cursor-pointer" type="submit">save</Button>
                        </div>
                    </form>
                </Form>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default SkillForm