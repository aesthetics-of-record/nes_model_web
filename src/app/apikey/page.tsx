"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useEffect, useState } from "react";

const Page = () => {
  const [keyList, setKeyList] = useState([
    { name: "key1", content: "rfr21d4rq3" },
  ]);

  const [createKey, setCreateKey] = useState("");

  useEffect(() => {
    console.log("실행");
    // axios.get("/dsaf").then((res) => {
    //   setKeyList(res.data);
    // });
  }, [createKey]);

  return (
    <div>
      <div className="p-4">
        <Card>
          <CardHeader>API KEY</CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableCell>API키</TableCell>
                <TableCell>내용</TableCell>
              </TableHeader>
              <TableBody>
                {keyList.map((key) => {
                  return (
                    <>
                      <TableRow className="w-full">
                        <TableCell>{key.name}</TableCell>
                        <TableCell>{key.content}</TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>키 생성</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
