"use client";

import { ISkill } from "@/interfaces";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import dayjs from 'dayjs'
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteSkillById } from "@/actions/skills";

function SkillsTable({ skills }: { skills: ISkill[] }) {
  const columns = ["Name", "Demo Link", "Repo Link", "Created At", "Actions"];
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [selectedSkillIdToDelete,setSelectedSkillIdToDelete] = useState<string | null>(null)

    const deleteSkillHandler = async(id : string) =>{
        try {
            setLoading(true)
            setSelectedSkillIdToDelete(id)
            const response = await deleteSkillById(id)

            if(!response.success){
                throw new Error(response.message)
            }
            toast.success(response.message)
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <div className="p-5 mt-7">
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
          {skills.map((skill) => (
            <TableRow key={skill.id}>
              <TableCell>{skill.name}</TableCell>
              <TableCell>{skill.demo_link}</TableCell>
              <TableCell>{skill.repo_link}</TableCell>
              <TableCell>{dayjs(skill.created_at).format("MMM DD YYYY HH:mm A")}</TableCell>
              <TableCell>
                <div className="flex gap-5">
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => deleteSkillHandler(skill.id)} ><Trash2 size={12} /></Button>
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => router.push(`/account/skills/edit/${skill.id}`)} ><Pencil size={12} /></Button>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default SkillsTable;
