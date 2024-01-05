"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { IoIosImages } from "react-icons/io";
import RightSidebar from "./RightSidebar";

const SheetRightSideFloatingButton = () => {
  return (
    <Sheet key={"left"}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={"icon"}
          className="rounded-full p-2 shadow-md shadow-primary"
        >
          <IoIosImages width={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="w-fit p-0">
        <RightSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SheetRightSideFloatingButton;
