"use server"

import supabase from "@/config/supabase-db-config"

export const fetchQueriesOfUser = async (userId: string) => {
    try {
        const {data, error} = await supabase.from('queries').select('*').eq("user_id", userId)
        
        if(error) throw new Error(error.message)
        
        return{
            success: true,
            data
        }
    
    } catch (error :any) {
        return{
            success: false,
            message: error.message
        }
    }
}


export const addNewQuery = async(payload: any) => {
    try {
        const { data, error } = await supabase.from('queries').insert(payload)
        
        if(error) throw new Error(error.message)
        
        return{
            success: true,
            data,
            message: 'Query created successfully'
        }
    
    } catch (error :any) {
        return{
            success: false,
            message: error.message
        }
    }
}