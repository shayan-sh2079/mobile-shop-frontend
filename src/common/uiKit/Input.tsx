import React, {
  DetailedHTMLProps,
  forwardRef,
  InputHTMLAttributes,
} from "react";
import IconBtn from "@/common/uiKit/IconBtn";

type Props = {
  icon?: React.ReactNode;
  iconProps?: DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
  label?: string;
  wrapperClasses?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, wrapperClasses, className, icon, iconProps, ...props }, ref) => {
    return (
      <div className={wrapperClasses}>
        {!!label && <p className={"mb-1 italic text-slate-900"}>{label}</p>}
        <div
          className={
            "flex justify-between rounded-md border border-slate-300 px-3 py-2 " +
            className
          }
        >
          <input
            ref={ref}
            {...props}
            className={"w-full bg-transparent outline-none"}
          />
          {!!icon && <IconBtn {...iconProps}>{icon}</IconBtn>}
        </div>
      </div>
    );
  },
);

export default Input;
