import { getEducationByUserId } from '@/actions/educations'
import { getUserProfileById } from '@/actions/user'
import { IEducation } from '@/interfaces'
import dayjs from 'dayjs'
import React from 'react'

interface EducationsPageProps {
  params : {
    id: string
  }
}

async function PortfolioEducations({params}: EducationsPageProps) {
  const { id } = await params

  const userProfileResponse: any = await getEducationByUserId(id)

  if(!userProfileResponse.success) return <div>Error: {userProfileResponse.message}</div>

  const educations: IEducation[] = userProfileResponse.data
  
  const sortedData = educations.sort((a,b) =>{
    return dayjs(b.start_date).unix() - dayjs(a.start_date).unix()
  })

  return (
    <div>
      <h1 className="my-7 text-2xl text-primary font-bold">Work Educations</h1>

      {
        sortedData.map((experience: IEducation) => (
          <div key={experience.id} className="flex gap-10">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div className="w-1 h-full bg-gray-500"></div>
            </div>
              <div className="flex flex-col gap-2 py-7">
                <h1 className='text-sm font-bold text-black'>{experience.degree} at {experience.instituation} {experience.location}</h1>
                <h1 className="text-gray-500 font-bold">
                  {dayjs(experience.start_date).format('MMM YYYY')} - {""} {experience.end_date ? dayjs(experience.end_date).format('MMM YYYY') : "Present"}
                </h1>
                <p className="text-gray-600 text-sm">{`GPAX ${experience.percentage}`}</p>
              </div>
          </div>
        ))
      }


    </div>
  )
}

export default PortfolioEducations