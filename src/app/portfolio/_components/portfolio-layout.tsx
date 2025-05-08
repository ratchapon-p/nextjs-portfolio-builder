'use client'
import { getConfiguration } from '@/actions/configurations';
import Spinner from '@/components/ui/spinner';
import { useParams, usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect,useState } from 'react'

function PortfolioLayout({children} : {children: React.ReactNode}) {
    const [config, setConfig] = useState({
        show_educations : true,
        show_percentage_in_educations : true,
        show_skill_icons : true,
        show_skills_level : true,
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchConfiguration()
    },[])



    const params = useParams()
    const pathname = usePathname();
    const router = useRouter()
    const userId: any = params?.id

    let menuItems = [
        {
            name:'Home',
            path:`/portfolio/${params.id}`
        },
        {
            name:'Education',
            path:`/portfolio/${params.id}/educations`
        },
        {
            name:'Projects',
            path:`/portfolio/${params.id}/projects`
        },
        {
            name:'Experience',
            path:`/portfolio/${params.id}/experiences`
        },
        {
            name:'Contact',
            path:`/portfolio/${params.id}/contactus`
        },
    ]

    
    const fetchConfiguration = async() =>{
        try {
            setLoading(true)
            const response: any = await getConfiguration(userId!)
            if(response.success && response.data) {
                setConfig(response.data)
            }
            
        } catch (error: any) {
            
        }finally{
            setLoading(false)
        }
    }

    if(config.show_educations === false){
        menuItems = menuItems.filter(item => item.name !== 'Education')
    }

    if(loading){
        return <div className="flex justify-center items-center h-screen"><Spinner /></div>
    }


  return (
    <div className='lg:px-24 px-5'>
        <div className="bg-primary text-white flex items-center justify-center p-5 gap-7 rounded-b-2xl">
            {
                menuItems.map((item,index) => (
                    <div className={`p-3 text-sm cursor-pointer ${pathname === item.path ? 'bg-gray-300 rounded  text-black' : ''}`} onClick={() => router.push(item.path)} key={index}>
                        {item.name}
                    </div>
                ))
            }
        </div>
        <div className="p-5">
            {children}
        </div>
    </div>
  )
}

export default PortfolioLayout