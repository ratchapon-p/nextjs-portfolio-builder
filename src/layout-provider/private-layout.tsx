import React, { useEffect, useState } from 'react'
import PrivateLayoutHeader from './_components/header'
import { IUser } from '@/interfaces'
import { getCurrentUser } from '@/actions/user'
import Spinner from '@/components/ui/spinner'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import userGlobalStore, { IuserGlobalStore } from '@/global-store/users-store'

function PrivateLayout({children} : {
  children: React.ReactNode
}) {
  // const [user, setUser] = useState<IUser | null>(null)
  const {user,setUser} = userGlobalStore() as IuserGlobalStore
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() =>{
    if(!user){
      fetchUser()
    }
  },[])

  const fetchUser = async() =>{
    try {
      setLoading(true)

      const response : any = await getCurrentUser()
      if(response.success){
        setUser(response.data);
        // toast.success("User data fetched successfully")
      }else{
        throw new Error("Error fetching user data")
      }

    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }

  }

  if(loading){
    return <div className="flex items-center justify-center h-screen"><Spinner /></div>
  }

  if(!loading && !user){
    return(
      <div className="">
        Error fetching user data
      </div>
    )
  }

  return (
    <div>
      <PrivateLayoutHeader 
      />
      {children}
    </div>
  )
}

export default PrivateLayout