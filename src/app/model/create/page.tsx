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
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { GiAutoRepair } from "react-icons/gi";
import { FaFileZipper } from "react-icons/fa6";
import axios from "axios";
import { apiOrigin } from "@/configs/urls";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
import { useRecoilState } from "recoil";
import { trainLoadingState } from "@/recoil/store";

export default function Page() {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadedFile, setUploadedFile] = useState<string>("");
  const [trainLoading, setTrainLoading] = useRecoilState(trainLoadingState);

  useEffect(() => {
    axios.get(apiOrigin + "/train_status").then((res) => {
      if (res.data.bool) {
        setTrainLoading(true);
      } else {
        setTrainLoading(false);
      }
    });
  }, []);

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("업로드할 파일:", selectedFile);

      const formData = new FormData();
      formData.append("file", selectedFile);

      setUploading(true);
      setUploadedFile("");

      axios.get(apiOrigin + "/train_status").then((res) => {
        if (res.data.bool) {
          // 빠져나오기
          toast.error("이미 다른 모델 학습이 진행 중 입니다.");
          return;
        }

        // 모델 학습 진행 중이 아닐 경우 정상적으로 업로드시키기
        axios
          .post(apiOrigin + "/upload_zip", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            console.log("파일 업로드 성공:", response.data);
            // 업로드 성공 시 처리
            toast.success("업로드 성공");
            setUploadedFile(selectedFile.name);
            setSelectedFile(null);
          })
          .catch((error) => {
            console.error("파일 업로드 실패:", error);
            // 업로드 실패 시 처리
            toast.error("업로드 실패");
          })
          .finally(() => {
            setUploading(false);
          });
      });
    } else {
      toast.error("업로드할 파일이 없습니다.");
    }
  };

  const handleTrain = () => {
    setTrainLoading(true);

    axios
      .get(apiOrigin + "/auto/train")
      .then((response) => {
        // 학습 성공 시 처리
        toast.success("학습 성공");
      })
      .catch((error) => {
        // 학습 실패 시 처리
        toast.error("학습 실패");
      })
      .finally(() => {
        setTrainLoading(false);
      });
  };

  if (trainLoading) {
    return (
      <div className="p-4">
        <Card className="max-w-[700px] m-auto">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <GiAutoRepair />
              </div>
              <div>모델 생성 중</div>
            </CardTitle>
            <CardDescription>
              <div>현재 모델을 생성하는 중 입니다. 잠시만 기다려 주세요.</div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-16" />

            <div className="flex items-center justify-center">
              <ClimbingBoxLoader color="#36d7b7" size={30} />
            </div>

            <div className="h-16" />

            <div>모델을 생성하는 중 입니다...</div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleTrain}
              disabled={trainLoading}
              className="font-bold"
            >
              {trainLoading ? <ClipLoader color="#36d7b7" /> : "모델생성시작"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Card className="max-w-[700px] m-auto">
        <CardHeader>
          <CardTitle className="flex gap-2">
            <div>
              <GiAutoRepair />
            </div>
            <div>파일업로드</div>
          </CardTitle>
          <CardDescription>
            먼저 라벨링 파일(Zip)을 업로드 해 주세요.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="label">
              <div className="group border h-32 flex items-center justify-center rounded-3xl cursor-pointer">
                {selectedFile ? (
                  selectedFile.name
                ) : (
                  <div className="flex items-center gap-2 group-hover:text-primary transition group-hover:opacity-70">
                    <FaFileZipper size={50} />
                    <div className="text-lg font-bold">
                      파일을 업로드 해 주세요.
                    </div>
                  </div>
                )}
              </div>
            </Label>
            <Input
              onChange={handleFileChange}
              className="w-52 hidden"
              id="label"
              type="file"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={handleUpload}
            disabled={uploading}
            className="font-bold"
          >
            {uploading ? <ClipLoader color="#36d7b7" /> : "업로드"}
          </Button>
        </CardFooter>
      </Card>
      <div className="h-8" />

      {uploadedFile === "" ? null : (
        <Card className="max-w-[700px] m-auto">
          <CardHeader>
            <CardTitle className="flex gap-2">
              <div>
                <GiAutoRepair />
              </div>
              <div>모델생성기</div>
            </CardTitle>
            <CardDescription>업로드 된 파일 : {uploadedFile}</CardDescription>
          </CardHeader>
          <CardContent>
            <div>현재 업로드한 파일로 모델을 생성하시겠습니까?</div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={handleTrain}
              disabled={trainLoading}
              className="font-bold"
            >
              {trainLoading ? <ClipLoader color="#36d7b7" /> : "모델생성시작"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
