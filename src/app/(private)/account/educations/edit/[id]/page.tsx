import React from 'react'
import EducationForm from '../../_components/education-form'
import { getEducationById } from '@/actions/educations'

interface IExperienceFormProps {
  params: {
      id: string
  }
}
async function EditEducationPage({params}: IExperienceFormProps) {
  const {id} = await params
  const experienceReponse = await getEducationById(id)
  if (!experienceReponse.success) {
      return <div className="">Failed to load experience data</div>
      
  }

  return (
    <div className='p-5'>
        <h1 className="text-xl font-bold mb-5">Add Education</h1>
      <EducationForm 
        initialValues={experienceReponse.data} 
        formType={'edit'}    
      />
    </div>
  )
}

export default EditEducationPage