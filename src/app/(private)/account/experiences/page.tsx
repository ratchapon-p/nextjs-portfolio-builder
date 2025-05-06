import { getExperienceByUserId } from '@/actions/experiences'
import { getCurrentUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import ExperienceTable from './_components/experiences-table'

async function ExperiencePage() {
      const userResponse : any = await getCurrentUser()
      if(!userResponse.success){
        return <div className="">Failed to load user data</div>
      }
    
      const projectsResponse = await getExperienceByUserId(userResponse?.data?.id!)
      if(!userResponse.success){
        return <div className="">Failed to load projects</div>
      }
    
      const experiences : any = projectsResponse.data;
    
    
  return (
    <div className='p-5'>
        <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-5">Experiences</h1>
            <Button>
                <Link href='/account/experiences/add' >Add Experience</Link>
            </Button>
        </div>
        <ExperienceTable 
          experiences={experiences}
        />
    </div>
  )
}

export default ExperiencePage