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
import { GiAutoRepair } from "react-icons/gi";
import { ClipLoader } from "react-spinners";
import { MdSettings } from "react-icons/md";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiOrigin } from "@/configs/urls";
import DialogButton from "@/components/DialogButton";
import ModelDialog from "@/components/ModelDialog";
import { usePagination } from "@mantine/hooks";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Page = () => {
  const [historys, setHistorys] = useState<any>([]);
  const [page, onChange] = useState(1);
  const pageSlice = 10;
  const pagination = usePagination({
    total: Math.ceil(historys.length / pageSlice),
    siblings: 1,
    page,
    onChange,
  });

  useEffect(() => {
    axios.get(apiOrigin + "/history").then((res) => {
      setHistorys(res.data);
    });
  }, []);

  return (
    <>
      <div className="p-4">
        <Card className="max-w-[700px] m-auto">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <MdSettings />
              </div>
              <div>히스토리 관리</div>
            </CardTitle>
            <CardDescription>
              모델을 수정하고 학습한 히스토리들을 확인할 수 있는 페이지입니다.
              클릭하여 더 자세한 히스토리를 확인할 수 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>히스토리 리스트</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">제목</TableHead>
                  <TableHead>생성일</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {historys
                  .slice(
                    pageSlice * (pagination.active - 1),
                    pageSlice * pagination.active
                  )
                  .map((history: any) => {
                    return (
                      <>
                        <TableRow
                          className="w-full"
                          // onClick={() => {
                          //   setDialog(model._id);
                          // }}
                        >
                          <TableCell className="font-medium">
                            <p className="truncate w-[100px]">
                              {history.title}
                            </p>
                          </TableCell>
                          <TableCell className="font-medium truncate">
                            <p className="truncate w-full">
                              {history.last_update}
                            </p>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => {
                      pagination.previous();
                    }}
                  />
                </PaginationItem>
                {pagination.range.map((item) => {
                  return (
                    <>
                      {item === "dots" ? (
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem>
                          <PaginationLink
                            isActive={item === pagination.active}
                            onClick={() => {
                              pagination.setPage(item);
                            }}
                          >
                            {item}
                          </PaginationLink>
                        </PaginationItem>
                      )}
                    </>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => {
                      pagination.next();
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Page;
