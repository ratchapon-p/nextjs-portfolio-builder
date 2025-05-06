'use server'

import supabase from "@/config/supabase-db-config"
import { AArrowDown } from "lucide-react"
import { revalidatePath } from "next/cache"

export const addNewProject = async(payload: any) =>{
    try {
        const { data, error } = await supabase.from('projects').insert(payload)

        if(error) throw new Error(error.message)

        return{
            success: true,
            data,
            message: 'Project created successfully'
        }

    } catch (error : any) {
        return{
            success: false,
            message: error.message
        }
    }
}


export const editProjectById = async(id: string, payload: any) =>{
    try {
        const { data, error } = await supabase.from('projects').update(payload).match({id})

        if(error) throw new Error(error.message)
 
        return{
            success: true,
            data,
            message: 'Project updated successfully'
        }

    } catch (error : any) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const getProjectByUserId = async(userId: string) => {
    try {
        
    const {data, error} = await supabase.from('projects').select('*').eq("user_id", userId).order("created_at",{ascending: false})

    if(error) throw new Error(error.message)

    return{
        success: true,
        data,
    }

    } catch (error : any) {
        return{
            success: false,
            message: error.message
        }
    }
}

export const getProjectById = async(id: string) =>{
    try {
        
        const {data, error} = await supabase.from('projects').select('*').eq("id", id).single()
    
        if(error) throw new Error(error.message)
    
        return{
            success: true,
            data,
        }
    
        } catch (error : any) {
            return{
                success: false,
                message: error.message
            }
        }
}


export const deleteProjectById = async(id: string) =>{
    try {
        
        const { error} = await supabase.from('projects').delete().match({id})
    
        if(error) throw new Error(error.message)
        revalidatePath('/account/projects')
        return{
            success: true,
            message: 'Project deleted successfully',
        }
    
        } catch (error : any) {
            return{
                success: false,
                message: error.message
            }
        }
}

