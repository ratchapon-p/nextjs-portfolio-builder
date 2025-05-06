import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { IUser } from "@/interfaces";
import PrivateLayoutSideBar from "./sidebar";
import userGlobalStore, { IuserGlobalStore } from "@/global-store/users-store";

function PrivateLayoutHeader() {
  const [openSideBar, setOpenSideBar] = useState(false);
  const {user} = userGlobalStore() as IuserGlobalStore
  return (
    <div className="bg-gray-100 p-5 flex justify-between items-center">
      <h1 className="font-bold text-3xl text-yellow-500">Portfolio Builder</h1>
      <div className="flex gap-5 items-center">
        <span className="text-sm">{user?.name}</span>
        <Button
          style={{ cursor: "pointer" }}
          onClick={() => setOpenSideBar(true)}
        >
          <Menu size={15} className="text-white" />
        </Button>
      </div>
      {openSideBar && (
        <PrivateLayoutSideBar 
            onClose={() => setOpenSideBar(false)}
            openSideBar={openSideBar}
        />        
      )}
    </div>
  );
}

export default PrivateLayoutHeader;
