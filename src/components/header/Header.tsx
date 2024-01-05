"use client";

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { ThemeMenu } from "./ThemeMenu";
import SheetSide from "../side/SheetSide";
import Image from "next/image";

interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();

  return (
    <div
      className={twMerge(
        `
    
    h-fit
  `,
        className
      )}
    >
      <div className="w-full flex items-center justify-between border-b p-2 px-5 fixed bg-background/90">
        <div className="flex items-center gap-x-3">
          <div className="block md:hidden">
            <SheetSide />
          </div>
          <div
            className="opacity-80 hover:opacity-100 cursor-pointer"
            onClick={() => {
              router.push("/");
            }}
          >
            <p>Logo</p>
          </div>
        </div>

        <div className="flex justify-center items-center gap-x-4">
          <ThemeMenu />
        </div>
      </div>
      <div className="h-[57px]" /> {/* 헤더크기인 57px 만큼.. */}
      <div className="">{children}</div>
    </div>
  );
};

export default Header;
