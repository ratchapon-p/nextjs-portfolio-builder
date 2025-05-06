import React from 'react'
import ProjectForm from '../_components/project-form'

function AddProjectPage() {
  return (
    <div className='p-5'>
        <h1 className="text-xl font-bold mb-5">Add Project</h1>
        <ProjectForm formType='add' />
    </div>
  )
}

export default AddProjectPage