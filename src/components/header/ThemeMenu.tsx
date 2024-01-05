"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { IoColorPalette } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export function ThemeMenu() {
  const { setTheme } = useTheme();
  const themes = ["rose", "blue", "orange", "green", "gradient1", "pink"];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <IoColorPalette color={"hsl(var(--primary))"} size={16} />
          <span className="sr-only">theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {themes.map((theme) => {
          return (
            <DropdownMenuItem
              key={theme}
              className="flex justify-center"
              onClick={() => setTheme(theme)}
            >
              <div className={cn("", theme)}>
                <div className={cn("w-5 h-5 rounded-full", "bg-primary")} />
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
