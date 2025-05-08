import { getSkillById, getSkillByUserId } from '@/actions/skills'
import { getUserProfileById } from '@/actions/user'
import { Button } from '@/components/ui/button'
import { ISkill, IUser } from '@/interfaces'
import React from 'react'

interface PortfolioHomePageProps {
  params : {
    id: string
  }
}

async function PortfolioHomePage({params} : PortfolioHomePageProps) {
  const { id } = await params
  const userProfileResponse = await getUserProfileById(id)

  if(!userProfileResponse.success) return <div>Error: {userProfileResponse.error}</div>

  const user: IUser = userProfileResponse.data
  const skillsResponse: any = await getSkillByUserId(id)

  let skills : ISkill[] = []

  if(skillsResponse.success) {
    skills = skillsResponse.data
  }




  return (
    <div className="">
      <div className='grid grid-cols-2 gap-10 mt-20'>
        <div className="col-span-1 flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-gray-500">Hi, I am </h1>
          <h1 className="text-4xl font-bold">
            {user.name}
          </h1>
          <p className="text-sm text-gray-600">{user.tag_line}</p>
          <div className="flex gap-5">
            <Button variant={'outline'} >Contact / Hire Me</Button>
            <Button>Download Resume</Button>
          </div>
        </div>
          <div className="col-span-1 flex justify-end">
            <img src={user.hero_image} alt={user.name} className='h-80 object-contain'/>
          </div>
      </div>

      <hr className="my-20" />

      <div className="">
        <h1 className="text-xl font-bold text-primary">About Me</h1>
        <p dangerouslySetInnerHTML={{__html: user.bio}} className="text-gray-600 text-sm mt-7"></p>

      </div>

      <hr className="my-20" />

      <div className="">
        <h1 className="text-xl font-bold text-primary">Skills and Technologies</h1>
        <div className="flex mt-7 flex-wrap gap-5">
          {skills.map((skill) => (
            <div key={skill.id} className="border border-gray-300 rounded p-5 flex flex-col items-center gap-4 w-40">
              <img src={skill.image} alt={skill.name} className='h-15 w-15' />
              <p className="text-sm">{skill.name}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="my-20" />

    </div>
      
  )
}

export default PortfolioHomePage