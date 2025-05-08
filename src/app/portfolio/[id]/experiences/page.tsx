import { getExperienceByUserId } from '@/actions/experiences'
import { getUserProfileById } from '@/actions/user'
import { IExperience } from '@/interfaces'
import dayjs from 'dayjs'
import React from 'react'

interface ExperiencesPageProps {
  params : {
    id: string
  }
}

async function PortfolioExperiences({params}: ExperiencesPageProps) {
  const { id } = await params

  const userProfileResponse: any = await getExperienceByUserId(id)

  if(!userProfileResponse.success) return <div>Error: {userProfileResponse.message}</div>

  const experiences: IExperience[] = userProfileResponse.data
  
  const sortedData = experiences.sort((a,b) =>{
    return dayjs(b.start_date).unix() - dayjs(a.start_date).unix()
  })

  return (
    <div>
      <h1 className="my-7 text-2xl text-primary font-bold">Academics / Education</h1>

      {
        sortedData.map((experience: IExperience) => (
          <div key={experience.id} className="flex gap-10">
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <div className="w-1 h-full bg-gray-500"></div>
            </div>
              <div className="flex flex-col gap-2 py-7">
                <h1 className='text-sm font-bold text-black'>{experience.role} as {experience.company}</h1>
                <h1 className="text-gray-500 font-bold">
                  {dayjs(experience.start_date).format('MMM YYYY')} - {""} {experience.end_date ? dayjs(experience.end_date).format('MMM YYYY') : "Present"}
                </h1>
                <p className="text-gray-600 text-sm">{experience.description}</p>
              </div>
          </div>
        ))
      }


    </div>
  )
}

export default PortfolioExperiences