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
import LeftSidebar from "./LeftSidebar";
import { LucideAlignJustify } from "lucide-react";

const SheetSide = () => {
  return (
    <Sheet key={"left"}>
      <SheetTrigger asChild>
        <Button variant="outline" size={"icon"} className="rounded-full p-2">
          <LucideAlignJustify width={16} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-fit p-0">
        <LeftSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default SheetSide;
