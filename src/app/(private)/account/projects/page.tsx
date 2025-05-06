import { getProjectByUserId } from '@/actions/projects'
import { getCurrentUser } from '@/actions/user'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'
import ProjectsTable from './_components/projects-table'

async function ProjectsPage() {

  const userResponse : any = await getCurrentUser()
  if(!userResponse.success){
    return <div className="">Failed to load user data</div>
  }

  const projectsResponse = await getProjectByUserId(userResponse?.data?.id!)
  if(!userResponse.success){
    return <div className="">Failed to load projects</div>
  }

  const projects : any = projectsResponse.data;


  return (
        <div className="p-5">
            <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-5">Project</h1>
            <Button>
                <Link href='/account/projects/add' >Add Project</Link>
            </Button>
        </div>
        <ProjectsTable 
          projects={projects}
        />
        </div>
  )
}

export default ProjectsPage

