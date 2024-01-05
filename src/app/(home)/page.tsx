"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { IoMdPersonAdd } from "react-icons/io";
import { FaKey } from "react-icons/fa";
import { GiAutoRepair } from "react-icons/gi";
import { MdFolderZip } from "react-icons/md";
import { MdSettings } from "react-icons/md";

export default function Page() {
  const router = useRouter();

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <BsFillPersonCheckFill />
              </div>
              <div>로그인</div>
            </CardTitle>
            <CardDescription>로그인 페이지 입니다.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                router.push("/aigame/select");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <GiAutoRepair />
              </div>
              <div>모델생성기</div>
            </CardTitle>
            <CardDescription>
              라벨링 된 데이터를 주면 자동으로 모델을 생성하고 버전관리를 할 수
              있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                router.push("/model/create");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <MdFolderZip />
              </div>
              <div>라벨링파일관리</div>
            </CardTitle>
            <CardDescription>라벨링파일 관리 페이지 입니다.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                router.push("/model/label");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
        <Card className="hover:opacity-80">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <MdSettings />
              </div>
              <div>모델관리</div>
            </CardTitle>
            <CardDescription>모델 버전관리 페이지 입니다.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                router.push("/model/manage");
              }}
            >
              시작하기
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
