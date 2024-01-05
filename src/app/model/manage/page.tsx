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
  const [models, setModels] = useState<any>([]);
  const [dialog, setDialog] = useState<null | string>(null);
  const [page, onChange] = useState(1);
  const pageSlice = 5;
  const pagination = usePagination({
    total: Math.ceil(models.length / pageSlice),
    siblings: 1,
    page,
    onChange,
  });

  useEffect(() => {
    axios.get(apiOrigin + "/models").then((res) => {
      setModels(res.data);
    });
  }, []);

  const handleDownload = (name: string, path: string) => {
    // 다운로드 링크를 생성합니다.
    const downloadLink = document.createElement("a");
    downloadLink.href = apiOrigin + path; // 다운로드할 파일의 경로를 지정하세요
    downloadLink.download = name; // 다운로드될 파일의 이름을 지정하세요
    downloadLink.click();
  };

  return (
    <>
      <ModelDialog
        dialog={dialog}
        setDialog={setDialog}
        models={models}
        setModels={setModels}
      />
      <div className="p-4">
        <Card className="max-w-[700px] m-auto">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <MdSettings />
              </div>
              <div>모델관리</div>
            </CardTitle>
            <CardDescription>
              지금까지 학습된 모델들을 관리하는 페이지입니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>학습된 모델 리스트</TableCaption>

              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">이름</TableHead>
                  <TableHead>생성일</TableHead>
                  <TableHead>다운로드</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {models
                  .slice(
                    pageSlice * (pagination.active - 1),
                    pageSlice * pagination.active
                  )
                  .map((model: any) => {
                    return (
                      <>
                        <TableRow
                          className="w-full"
                          onClick={() => {
                            setDialog(model._id);
                          }}
                        >
                          <TableCell className="font-medium">
                            <p className="truncate w-[100px]">{model.name}</p>
                          </TableCell>
                          <TableCell className="font-medium truncate">
                            <p className="truncate w-full">
                              {model.last_update}
                            </p>
                          </TableCell>
                          <TableCell className="">
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDownload(model.name, model.path);
                              }}
                            >
                              다운로드
                            </Button>
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
