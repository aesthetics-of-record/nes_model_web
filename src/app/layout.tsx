import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/themeProvider";
import Header from "@/components/header/Header";
import SideLayout from "@/components/side/SideLayout";
import { Toaster } from "react-hot-toast";
import Providers from "@/providers/Providers";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export const metadata: Metadata = {
  title: "CORE AI",
  description: "AI APPLICATION",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Providers>
          <ThemeProvider>
            <Header>
              <SideLayout>{children}</SideLayout>
            </Header>
            <Toaster />
            {/* <SheetRightSideFloatingButton /> */}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
