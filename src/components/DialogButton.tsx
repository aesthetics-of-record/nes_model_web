import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FunctionComponent, ReactNode } from "react";

interface DialogButtonProps {
  children: ReactNode;
}

const DialogButton: FunctionComponent<DialogButtonProps> = ({ children }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild className="w-fit">
          {children}
        </DialogTrigger>
        <DialogContent>
          <div>안녕</div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogButton;
