"use client";
import React, { useState } from 'react'
import { Button } from '../ui/button';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function SignOutButton() {
    const [loading, setLoading] = useState(false)
    const {signOut} = useAuth()
    const router = useRouter()
    const onSignOut = async() =>{
        try {
            setLoading(true)
            await signOut()
            router.push('/')
        } catch (error) {
           console.log(error);
            
        }
        finally{
            setLoading(false)
        }
    }

  return (
        <Button
            style={{cursor: 'pointer'}}
            disabled={loading}
            onClick={onSignOut}
            className='w-full'
        >Sign Out</Button>
  )
}

export default SignOutButton