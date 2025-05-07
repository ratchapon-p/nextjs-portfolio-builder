"use client";

import { IEducation } from "@/interfaces";
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
import { deleteEducationById } from "@/actions/educations";


function EducationTable({ educations }: { educations: IEducation[] }) {
  const columns = [
  "Degree", 
  "Instituation", 
  "Location", 
  "Start Date", 
  "End Date", 
  "Percentage", 
  "Create Date", 
  "Actions",
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedEducationIdToDelete, setSelectedEducationIdToDelete] = useState<
    string | null
  >(null);

  const deleteEducationHandler = async (id: string) => {
    try {
      setLoading(true);
      setSelectedEducationIdToDelete(id);
      const response = await deleteEducationById(id);

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
            {educations.map((education) => (
            <TableRow key={education.id}>
                <TableCell>{education.degree}</TableCell>
                <TableCell>{education.instituation}</TableCell>
                <TableCell>{education.location}</TableCell>
                <TableCell>{dayjs(education.start_date).format("MMM DD YYYY")}</TableCell>
                <TableCell>{dayjs(education.end_date).format("MMM DD YYYY")}</TableCell>
                <TableCell>{education.percentage}</TableCell>
                <TableCell>{dayjs(education.created_at).format("MMM DD YYYY HH:mm A")}</TableCell>
                <TableCell>
                <div className="flex gap-5">
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => deleteEducationHandler(education.id)} ><Trash2 size={12} /></Button>
                    <Button disabled={loading} variant={"outline"} size={'sm'} onClick={() => router.push(`/account/educations/edit/${education.id}`)} ><Pencil size={12} /></Button>
                </div>
                </TableCell>

            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
  );
}

export default EducationTable;
