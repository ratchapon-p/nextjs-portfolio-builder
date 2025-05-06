"use client";

import { IExperience } from "@/interfaces";
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
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { deleteExperienceById } from "@/actions/experiences";


function ExperienceTable({ experiences }: { experiences: IExperience[] }) {
  const columns = ["Role", "Company", "Start Date", "End Date", "Location", "Actions"];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedExperienceIdToDelete, setSelectedExperienceIdToDelete] = useState<
    string | null
  >(null);

  const deleteExperienceHandler = async (id: string) => {
    try {
      setLoading(true);
      setSelectedExperienceIdToDelete(id);
      const response = await deleteExperienceById(id);

      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
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
            {experiences.map((experience) => (
            <TableRow key={experience.id}>
                <TableCell>{experience.role}</TableCell>
                <TableCell>{experience.company}</TableCell>
                <TableCell>{dayjs(experience.start_date).format("MMM DD YYYY HH:mm A")}</TableCell>
                <TableCell>{dayjs(experience.end_date).format("MMM DD YYYY HH:mm A")}</TableCell>
                <TableCell>{experience.location}</TableCell>
                <TableCell>
                <div className="flex gap-5">
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => deleteExperienceHandler(experience.id)} ><Trash2 size={12} /></Button>
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => router.push(`/account/experiences/edit/${experience.id}`)} ><Pencil size={12} /></Button>
                </div>
                </TableCell>

            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}

export default ExperienceTable;
