import React from 'react'
import ProjectForm from '../../_components/project-form'
import { getProjectById } from '@/actions/projects';

interface IEditProjectPageProps {
  params: {
    id: string ;
  }
}

async function EditProjectPage({params}: IEditProjectPageProps) {
  const { id } = await params

  const projectReponse = await getProjectById(id)

  if(!projectReponse.success) <div className="">Failed to load project data</div>
  
  return (
    <div className='p-5'>
        <h1 className="text-xl font-bold mb-5">EditProject</h1>
        <ProjectForm formType='edit' initialValues={projectReponse.data} />
    </div>
  )
}

export default EditProjectPage