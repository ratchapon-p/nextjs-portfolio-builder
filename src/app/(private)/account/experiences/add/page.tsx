import React from 'react'
import ExperienceForm from '../_components/experience-form'

function AddExperiencePage() {
  return (
    <div className='p-5'>
         <h1 className="text-xl font-bold mb-5">Add Experiences</h1>
         <ExperienceForm 
            initialValues={undefined} 
            formType={'add'}         
         />
    </div>
  )
}

export default AddExperiencePage