"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChatListState, aiListState } from "@/recoil/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { PulseLoader } from "react-spinners";
import toast from "react-hot-toast";

export function ChatDialog({
  children,
  ai,
  index,
}: {
  children: React.ReactNode;
  ai: any;
  index: number;
}) {
  const [aiList] = useRecoilState(aiListState);
  const [chatList, setChatList] = useRecoilState<any>(ChatListState);
  const [loadding, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-fit">
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chat</DialogTitle>
          <DialogDescription>
            어떤 캐릭터일지 대화를 하며 맞춰보세요.
          </DialogDescription>
        </DialogHeader>
        <section className="flex flex-col w-full">
          <header className="border-b dark:border-zinc-700 p-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <div>
                <span>AI - {index + 1}</span>
                <span className="text-xs text-green-600 block">Online</span>
              </div>
            </h2>
          </header>
          <main className="flex-1 overflow-auto p-4 max-h-[500px]">
            <div className="space-y-4">
              {chatList[index] ? (
                <>
                  {chatList[index].map((chat: any) => {
                    return (
                      <>
                        {chat.role === "ai" ? (
                          <div className="flex items-end gap-2">
                            <div className="rounded-lg bg-zinc-700 p-2">
                              <p className="text-sm">{chat.message}</p>
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-end gap-2 justify-end">
                            <div className="rounded-lg bg-primary p-2">
                              <p className="text-sm">{chat.message}</p>
                            </div>
                          </div>
                        )}
                      </>
                    );
                  })}
                </>
              ) : null}
              {loadding ? (
                <div>
                  <PulseLoader color="#36d7b7" />
                </div>
              ) : null}
            </div>
          </main>
          <footer className="border-t dark:border-zinc-700 p-4">
            <form
              className="flex items-center gap-2"
              onSubmit={async (e: any) => {
                e.stopPropagation(); // 이벤트버블링 방지
                e.preventDefault();
                const message = e.target.message.value;
                const copy = [...chatList];
                copy[index] = [
                  ...copy[index],
                  { role: "user", message: message },
                ];
                setLoading(true);
                setChatList(copy);

                axios
                  .post("/api/v1/chat", { id: ai.id, message: message })
                  .then((res) => {
                    const copy2 = [...copy];
                    copy2[index] = [
                      ...copy2[index],
                      { role: "ai", message: res.data },
                    ];
                    setChatList(copy2);
                    setLoading(false);
                    setValue("");
                  })
                  .catch((err) => {
                    const copy2 = [...copy];
                    copy2[index] = [
                      ...copy2[index],
                      {
                        role: "ai",
                        message: "🥵메세지 전송 중 에러발생 다시보내주세요.",
                      },
                    ];
                    setChatList(copy2);
                    setLoading(false);
                    setValue("");
                    toast.error("메세지를 다시 보내 주세요.");
                  });
              }}
            >
              <Input
                className="flex-1"
                name="message"
                placeholder="메시지를 입력하세요..."
                value={value}
                onChange={onChange}
                disabled={loadding}
              />
              <Button type="submit" disabled={loadding}>
                보내기
              </Button>
            </form>
          </footer>
        </section>
      </DialogContent>
    </Dialog>
  );
}
