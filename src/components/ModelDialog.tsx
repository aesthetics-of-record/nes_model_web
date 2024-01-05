import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { apiOrigin } from "@/configs/urls";

const ModelDialog = ({
  dialog,
  setDialog,
  models,
  setModels,
}: {
  dialog: string | null;
  setDialog: any;
  models: any;
  setModels: any;
}) => {
  function filterObjectsById(objectsArray: any[], targetId: string | null) {
    return objectsArray.filter((object) => object._id === targetId);
  }

  const [name, setName] = useState<string>("");
  const [memo, setMemo] = useState<string>("");

  useEffect(() => {
    setName(filterObjectsById(models, dialog)[0]?.name);
    setMemo(filterObjectsById(models, dialog)[0]?.memo);
  }, [dialog]);

  const onSave = () => {
    axios
      .put(apiOrigin + "/update_model", {
        objid: filterObjectsById(models, dialog)[0]?._id,
        name: name,
        memo: memo,
      })
      .then((res) => {
        console.log(res.data);

        axios.get(apiOrigin + "/models").then((res) => {
          setModels(res.data);
          setDialog(null);
        });
      });
  };

  return (
    <>
      <Dialog
        onOpenChange={(open: boolean) => {
          if (!open) {
            setDialog(null);
          }
        }}
        open={dialog === null ? false : true}
      >
        <DialogContent>
          {/* <div>{filterObjectsById(models, dialog)[0]?._id}</div> */}
          <DialogHeader>
            <DialogTitle>파일명 및 메모 수정</DialogTitle>
            <DialogDescription>
              파일명과 메모를 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                파일명
              </Label>
              <Input
                id="name"
                value={name}
                className="col-span-3"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="memo" className="text-right">
                메모장
              </Label>
              <Textarea
                id="memo"
                value={memo}
                className="col-span-3"
                onChange={(e) => {
                  setMemo(e.target.value);
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={onSave}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModelDialog;
