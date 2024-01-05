"use client";
import * as React from "react";
import useTheme from "@/hooks/useTheme";

interface ThemeProviderProps {
  children: React.ReactNode;
  className?: string;
}

export function ThemeProvider({ children, className }: ThemeProviderProps) {
  const { theme } = useTheme();

  // 처음 웹 페이지 접속 했을 때, 정한 theme가 없다면 기본theme로 설정
  React.useEffect(() => {
    // 첫 렌더링 일 때
    if (theme === null) {
      if (!("theme" in localStorage)) {
        localStorage.setItem("theme", "dark-red");
        document.documentElement.classList.add("dark-red");
      }

      if ("theme" in localStorage) {
        document.documentElement.classList.add(localStorage.getItem("theme")!);
      }
    }
    //  theme변경으로 일어난 렌더링 일 때
    else {
      // 처음으로 theme를 변경 할 때
      if (!("theme" in localStorage)) {
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          localStorage.setItem("theme", theme);
          document.documentElement.classList.replace("dark-red", theme);
        } else {
          localStorage.setItem("theme", theme);
          document.documentElement.classList.replace("dark-light", theme);
        }
      }
      // 첫 theme 변경이 아닐 때
      if ("theme" in localStorage) {
        // 그 전 theme 를 새로운 theme로 변경
        document.documentElement.classList.replace(
          localStorage.getItem("theme")!,
          theme
        );
        localStorage.setItem("theme", theme);
      }
    }
  }, [theme]);

  return <div>{children}</div>;
}
