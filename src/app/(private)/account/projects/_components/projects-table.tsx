"use client";

import { IProject } from "@/interfaces";
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
import { deleteProjectById } from "@/actions/projects";

function ProjectsTable({ projects }: { projects: IProject[] }) {
  const columns = ["Name", "Demo Link", "Repo Link", "Created At", "Actions"];
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [selectedProjectIdToDelete,setSelectedProjectIdToDelete] = useState<string | null>(null)

    const deleteProjectHandler = async(id : string) =>{
        try {
            setLoading(true)
            setSelectedProjectIdToDelete(id)
            const response = await deleteProjectById(id)

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
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.demo_link}</TableCell>
              <TableCell>{project.repo_link}</TableCell>
              <TableCell>{dayjs(project.created_at).format("MMM DD YYYY HH:mm A")}</TableCell>
              <TableCell>
                <div className="flex gap-5">
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => deleteProjectHandler(project.id)} ><Trash2 size={12} /></Button>
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => router.push(`/account/projects/edit/${project.id}`)} ><Pencil size={12} /></Button>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ProjectsTable;
