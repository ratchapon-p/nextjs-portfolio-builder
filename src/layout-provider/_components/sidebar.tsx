import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet";
import { Book, Home, LaptopMinimalCheck, ListCheck, Presentation, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import SignOutButton from '@/components/functional/sing-out-button';

function PrivateLayoutSideBar({onClose, openSideBar} : {onClose: () => void, openSideBar: boolean}) {

    const pathname = usePathname()
    const router = useRouter();

    const menuItems = [
        {
            title: 'Home',
            path: '/account',
            icon: <Home size={14} />
        },
        {
            title: 'Profile',
            path: '/account/profile',
            icon: <User size={14} />
        },
        {
            title: 'Educations',
            path: '/account/educations',
            icon: <Book size={14} />
        },
        {
            title: 'Skills',
            path: '/account/skills',
            icon: <LaptopMinimalCheck size={14} />
        },
        {
            title: 'Projects',
            path: '/account/projects',
            icon: <Presentation size={14} />
        },
        {
            title: 'Experiences',
            path: '/account/experiences',
            icon: <ListCheck size={14} />
        },
    
    ]

  return (
            <Sheet
              open={openSideBar}
              onOpenChange={onClose}
            >
              <SheetContent className="min-w-[300px]">
                <SheetHeader>
                  {/* <SheetTitle>Edit Profile</SheetTitle> */}
                </SheetHeader>
                <div className="flex flex-col gap-7 mt-10  m-5 cursor-pointer">
                    {
                    menuItems.map((item) => (
                        <div 
                            className={`flex gap-4 items-center p-3 ${pathname === item.path ? "bg-gray-100 border-gray-400 rounded border cursor-pointer" : ""}`}
                            onClick={() => router.push(item.path)}
                        >
                            {item.icon}
                            <span className='text-sm'>{item.title}</span>
                        </div>
                    ))
                    }
                    <SignOutButton />
                </div>
              </SheetContent>
            </Sheet>
  )
}

export default PrivateLayoutSideBar