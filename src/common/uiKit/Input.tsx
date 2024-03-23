import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import IconBtn from "@/common/uiKit/IconBtn";

type Props = {
  icon?: React.ReactNode;
  iconProps?: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = ({ className, icon, iconProps, ...props }: Props) => {
  return (
    <div
      className={
        "flex justify-between rounded-md border border-slate-300 px-3 py-2 " +
        className
      }
    >
      <input {...props} className={"outline-none"} />
      {!!icon && <IconBtn {...iconProps}>{icon}</IconBtn>}
    </div>
  );
};

export default Input;
