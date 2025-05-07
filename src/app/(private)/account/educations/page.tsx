import { getEducationByUserId } from '@/actions/educations'
import { getCurrentUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import EducationTable from './_components/educations-table'

async function EducationsPage() {
  const userResponse : any = await getCurrentUser()
  if(!userResponse.success){
    return <div className="">Failed to load user data</div>
  }

  const projectsResponse = await getEducationByUserId(userResponse?.data?.id!)
  if(!userResponse.success){
    return <div className="">Failed to load projects</div>
  }

  const educations : any = projectsResponse.data;

      
  return (
    <div
      className='p-5'
    >
      <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-5">Educations</h1>
            <Button>
                <Link href='/account/educations/add' >Add Education</Link>
            </Button>
        </div>
        <EducationTable 
          educations={educations}
        />
    </div>
  )
}

export default EducationsPage