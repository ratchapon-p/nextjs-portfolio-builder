'use client'
import React, { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
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
import userGlobalStore, { IuserGlobalStore } from "@/global-store/users-store";
import Editor from 'react-simple-wysiwyg';
import toast from "react-hot-toast";
import { uploadFileAndGetUrl } from "@/helpers/uploads";
import { updateCurrentUser } from "@/actions/user";

function ProfilePage() {

  const {user} = userGlobalStore() as IuserGlobalStore
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  
  const formSchema = z.object({
    name: z.string().nonempty().min(3).max(50),
    title: z.string().nonempty().min(3).max(50),
    tag_line: z.string().nonempty(),
    bio: z.string(),
    hero_image: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      title: user?.title || "",
      tag_line: user?.tag_line || "",
      bio: user?.bio || "",
      hero_image: user?.hero_image || "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const payload : any = {...values}

      if(selectedFile){
        payload.hero_image = await uploadFileAndGetUrl(selectedFile)
      }

      console.log(payload);
      const response : any = await updateCurrentUser({...payload,id: user?.id})

      if(response.success){
        toast.success("User profile updated successfully")
      }else{
        toast.error(response.error)
      }

    } catch (error : any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const heroImagePreview = useMemo(() =>{
    if(selectedFile){
      return URL.createObjectURL(selectedFile)
    }
    return user?.hero_image || ""
  },[selectedFile])
  
  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-5">Profile</h1>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Title eg. Frontend Developer, Backend Developer, Fullstack Developer" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tag_line"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="Enter you tag line" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Editor 
                  value={field.value}
                  onChange={(e) => form.setValue('bio', e.target.value)}
                  className="text-sm"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="hero_image"
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

        {heroImagePreview && (
          <div className="p-2 border rounded w-max">
            <img src={heroImagePreview} alt="hero image" className="w-32 h-32 rounded" />
          </div>
        )}
        <div className="flex justify-end gap-5">
          <Button disabled={loading} className="cursor-pointer" type="submit">Update Profile</Button>
        </div>
      </form>
    </Form>

    </div>
  );
}

export default ProfilePage