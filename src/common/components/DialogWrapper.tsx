import React from "react";
import CloseRoundedIcon from "@/common/icons/CloseRoundedIcon";
import IconBtn from "@/common/uiKit/IconBtn";
import useDisableBodyScroll from "@/common/hooks/useDisableBodyScroll";

type Props = {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
};

const DialogWrapper = (props: Props) => {
  useDisableBodyScroll();

  return (
    <div
      className={"fixed inset-0 z-50 h-screen w-screen bg-slate-50"}
      role='presentation'
    >
      <div
        className={
          "mb-10 flex justify-between border-b border-gray-300 px-4 py-3"
        }
      >
        <p className={"font-medium text-slate-900"}>{props.title}</p>
        <IconBtn onClick={props.onClose}>
          <CloseRoundedIcon />
        </IconBtn>
      </div>
      {props.children}
    </div>
  );
};

export default DialogWrapper;
