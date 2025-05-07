import React from 'react'
import EducationForm from '../_components/education-form'

function AddEducationPage() {
  return (
    <div className='p-5'>
      <h1 className="text-xl font-bold mb-5">Add Education</h1>
      <EducationForm 
        formType='add'
        initialValues={undefined}
      />
    </div>
  )
}

export default AddEducationPage