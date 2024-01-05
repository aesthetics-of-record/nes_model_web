"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./ui/input";
import { ChatDialog } from "./ChatDialog";
import { useRecoilState } from "recoil";
import { ChatListState, RandomAiNameListState } from "@/recoil/store";
import { useEffect } from "react";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function AiTable({ aiList }: { aiList: any }) {
  // 랜덤화 시켜서 aiList를 서버에서 보내줄 예정.
  const [randomAiNameList, setRandomAiNameList] = useRecoilState<any>(
    RandomAiNameListState
  );
  const router = useRouter();
  // 보기를 만들기 위해 받은 리스트를 랜덤화 하여 보기를 만듬
  const popRandomElement = (arr: any[]) => {
    if (arr.length === 0) return; // 배열이 비어있으면 undefined 반환

    let randomIndex = Math.floor(Math.random() * arr.length); // 무작위 인덱스 생성
    let element = arr[randomIndex]; // 요소 선택

    arr.splice(randomIndex, 1); // 배열에서 요소 제거

    return element; // 선택된 요소 반환
  };

  const [chatList, setChatList] = useRecoilState<any>(ChatListState);

  useEffect(() => {
    let arr = [];
    for (let i = 0; i < aiList.length; i++) {
      arr.push([
        { role: "ai", message: "반갑습니다. 메세지를 입력 해 주세요." },
      ]);
    }
    setChatList(arr);
  }, [aiList]);

  useEffect(() => {
    let randomList = [];
    let arr = [...aiList];
    for (let i = 0; i < aiList.length; i++) {
      let randomElement = popRandomElement(arr);
      randomList.push(randomElement);
    }
    console.log(randomList);
    console.log(aiList);
    setRandomAiNameList(randomList);
  }, [aiList]);

  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        for (let index = 0; index < aiList.length; index++) {
          const randomListIndex =
            parseInt(e.target[`ai${index + 1}`].value) - 1;
          // console.log(randomListIndex);
          if (aiList[index].id != randomAiNameList[randomListIndex].id) {
            toast.error("틀렸습니다.");
            return;
          }
        }

        toast.success("정답을 맞췄습니다 !");
        router.push("/");
      }}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">
              <div className="text-center mb-4">보기</div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="grid grid-cols-2">
          {randomAiNameList.map((randomAi: any, index: number) => {
            return (
              <TableCell key={index}>
                {index + 1}. {randomAi.name}
              </TableCell>
            );
          })}
        </TableBody>
      </Table>

      <div className="h-10" />
      <Table>
        <TableCaption>Ai 들이 누구인지 맞춰보세요.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">AI</TableHead>
            <TableHead>정답</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {aiList.map((row: any, index: number) => (
            <TableRow key={row.id} className="w-full">
              <ChatDialog ai={row} index={index}>
                <TableCell className="font-medium cursor-pointer w-[250px]">
                  <div className="p-2">AI - {index + 1}</div>
                </TableCell>
              </ChatDialog>

              <TableCell className="font-medium">
                <Input
                  key={row.id}
                  type="number"
                  name={`ai${index + 1}`}
                ></Input>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between">
        <div></div>
        <Button type="submit">정답맞추기</Button>
      </div>
    </form>
  );
}
