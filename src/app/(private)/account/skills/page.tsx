"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import { deleteSkillById, getSkillByUserId } from '@/actions/skills'
import SkillForm from './_components/skill-form'
import toast from 'react-hot-toast'
import userGlobalStore, { IuserGlobalStore } from '@/global-store/users-store'
import Spinner from '@/components/ui/spinner'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { ISkill } from '@/interfaces'

function SkillsPage() {

  const {user} = userGlobalStore() as IuserGlobalStore

  const [openSkillForm, setOpenSkillForm] = useState(false)
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null)

  useEffect(() =>{
    fetchData()
  },[])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response : any = await getSkillByUserId(user?.id!)
      if(!response.success){
        throw new Error(response.message)
      }
      setSkills(response.data)
    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  const columns = ["", "Name", "Level", "Actions"];

  const deleteSkillHandler = async(id : string) =>{
    try {
      setLoading(true)
      const response : any = await deleteSkillById(id)
      
      if(!response.success){
        throw new Error(response.message)
      }
      toast.success(response.message)
      fetchData()
    } catch (error: any) {
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }
console.log(selectedSkill,'SSLSS');

  return (
        <div className="p-5 flex flex-col gap-7">
            <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold mb-5">Skill</h1>
            <Button
              onClick={() => setOpenSkillForm(true)}
            >
                Add Skill
            </Button>
        </div>
        {loading && <div className="h-40 flex justify-center items-center mt-40"><Spinner /></div>}

        {!loading && skills.length && (
          <Table className="border border-gray-400 ">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader className="bg-gray-200 ">
            <TableRow className="font-semibold">
              {columns.map((columns, index) => (
                <TableHead key={index}>{columns}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {skills.map((skill : ISkill) => (
              <TableRow key={skill.id}>
                <TableCell>{skill.image && <img src={skill.image} alt={skill.name} className='w-20 h-20 rounded-full' />}</TableCell>
                <TableCell>{skill.name}</TableCell>
                <TableCell>{skill.level}</TableCell>
                <TableCell>
                  <div className="flex gap-5">
                      <Button disabled={loading} variant={"outline"} size={'icon'} onClick={() => deleteSkillHandler(skill.id)} ><Trash2 size={12} /></Button>
                      <Button disabled={loading} variant={"outline"} size={'icon'} onClick={() => {
                        setSelectedSkill(skill)
                        setOpenSkillForm(true)
                      }} ><Pencil size={12} /></Button>
                  </div>
                </TableCell>
  
              </TableRow>
            ))}
          </TableBody>
        </Table>
        )}

        {
          openSkillForm &&(
            <SkillForm 
              openSkillForm={openSkillForm}
              setOpenSkillForm={setOpenSkillForm}
              reloadData={fetchData}
              formType={selectedSkill ? 'edit' : 'add'}
              initialValues={selectedSkill}
              setInitialValues={setSelectedSkill}
            />
          )
        }
        </div>
  )
}

export default SkillsPage

