import { getExperienceById } from '@/actions/experiences'
import React from 'react'
import ExperienceForm from '../../_components/experience-form'


interface IExperienceFormProps {
    params: {
        id: string
    }
}

async function EditExperience({params}: IExperienceFormProps) {
    const {id} = await params
    const experienceReponse = await getExperienceById(id)
    if (!experienceReponse.success) {
        return <div className="">Failed to load experience data</div>
        
    }
  return (
    <div className='p-5'>
         <h1 className="text-xl font-bold mb-5">Edit Experiences</h1>
         <ExperienceForm 
            initialValues={experienceReponse.data} 
            formType={'edit'}         
         />
    </div>
  )
}

export default EditExperience