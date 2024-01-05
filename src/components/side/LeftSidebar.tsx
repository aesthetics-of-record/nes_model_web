"use client";

import { useMemo } from "react";
import Box from "../Box";
import { HiHome } from "react-icons/hi";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import SidebarItem from "./SidebarItem";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { GiAutoRepair } from "react-icons/gi";
import { MdFolderZip } from "react-icons/md";
import { MdSettings } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";

interface LeftSidebarProps {
  className?: string;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ className }) => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: HiHome,
        label: "홈",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: BsFillPersonCheckFill,
        label: "로그인",
        active: pathname === "/login",
        href: "/login",
      },
      {
        icon: GiAutoRepair,
        label: "모델생성기",
        active: pathname === "/model/create",
        href: "/model/create",
      },
      {
        icon: MdFolderZip,
        label: "라벨링파일관리",
        active: pathname === "/model/label",
        href: "/model/label",
      },
      {
        icon: MdSettings,
        label: "모델관리",
        active: pathname === "/model/manage",
        href: "/model/manage",
      },
      {
        icon: MdWorkHistory,
        label: "히스토리",
        active: pathname === "/model/history",
        href: "/model/history",
      },
    ],
    [pathname]
  );

  return (
    <div className={cn("flex", className)}>
      <div className="flex flex-col gap-y-2 h-screen w-[250px] border-r">
        <Box className="h-full px-5">
          <div className="flex flex-col gap-y-2 px-5 py-4">
            {routes.map((item: any) => {
              return (
                <>
                  <SidebarItem key={item.label} {...item}></SidebarItem>
                  {item.href === "/image-create" ? <Separator /> : null}
                </>
              );
            })}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default LeftSidebar;
