import { getProjectByUserId } from '@/actions/projects'
import { getUserProfileById } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { IProject, IUser } from '@/interfaces'
import Link from 'next/link'
import React from 'react'

interface ProjectsPageProps {
  params : {
    id: string
  }
}

async function PortfolioProjects({params}: ProjectsPageProps) {
  const { id } = await params
  const userProfileResponse = await getUserProfileById(id)

  if(!userProfileResponse.success) return <div>Error: {userProfileResponse.error}</div>

  const user: IUser = userProfileResponse.data
  const projectsResponse: any = await getProjectByUserId(id)

  let projects : IProject[] = []

  if(projectsResponse.success) {
    projects = projectsResponse.data
  }

  return (
    <div>
      <h1 className='my-7 text-2xl font-bold text-primary'>Projects</h1>

      <div className="flex flex-col gap-7">
        {
          projects.map((project: IProject) => (
            <div key={project.id} className="grid grid-cols-3 p-5 border border-gray-300 rounded-lg gap-5 hover:border-primary">
              <div className="">
                <img src={project.image} className="h-40 w-60 object-cover rounded-lg" alt={project.name} />

              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <h1 className="text-lg font-semibold">{project.name}</h1>
                <p className="text-sm text-gray-600">{project.description}</p>           
                <div className='flex flex-wrap gap-5'>
                  {
                    project.tech_stack.split(',').map((tech: string) => (
                      <span key={tech} className="bg-gray-600 text-white rounded-2xl p-3 text-sm">{tech}</span>
                    ))
                  }
                </div>
                <div className="flex justify-end gap-5">
                  <Button variant={'outline'}><Link href={project.demo_link}>Demo</Link></Button>
                  <Button variant={'outline'} className='bg-primary hover:bg-primary-foreground'><Link href={project.repo_link} >Code</Link></Button>
                </div>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default PortfolioProjects