"use client";
import { Button } from "@/components/ui/button";
import cvImage from "../assets/personal-data-88.png";
import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignIn, SignUp } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

const menuItem = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];

const HomePage = () => {
  const [openSheet, setOpenSheet] = useState(false);
  const searchParam:any = useSearchParams()
  const formType = searchParam.get("formType")

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between items-center bg-gray-100 px-20 py-5">
        <h1 className="font-bold text-3xl text-primary">Portfolio Builder</h1>
        <div className="flex justify-end gap-5 items-center">
          {menuItem.map((item) => (
            <span key={item.title} className="text-sm font-bold text-gray-600">
              {item.title}
            </span>
          ))}
          <Button
            style={{ cursor: "pointer" }}
            onClick={() => setOpenSheet(true)}
          >
            Sign-In
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-10 mt-20 h-[70vh] px-20">
        <div className="flex flex-col justify-center">
          <div>
            <h1 className="text-4xl font-bold text-primary">
              Portfolio Builder Project
            </h1>
            <p className="text-gray-600">
              A web-based tool that allows users to easily create and customize
              personal portfolio websites. It features sections for projects,
              skills, education, and contact info, with multiple themes and
              layout options. No coding required just input your details and
              publish your portfolio instantly.
            </p>
          </div>
        </div>
        <div>
          <img src={cvImage.src} width={700} />
        </div>
      </div>
      {openSheet && (
        <Sheet
          open={openSheet}
          onOpenChange={setOpenSheet}
        >
          <SheetContent className="min-w-[500px] flex justify-center items-center">
            <SheetHeader>
              {/* <SheetTitle>Edit Profile</SheetTitle> */}
            </SheetHeader>
            {formType === 'sign-in' ? (
              <SignIn 
                routing="hash"
                signUpUrl="/?formType=sign-up"
                fallbackRedirectUrl='/account'
              />
            )
            :
             ( <SignUp 
                routing="hash"
                signInUrl="/?formType=sign-in"
                fallbackRedirectUrl='/account'
              />)
            }
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
};

export default HomePage;
