import React from "react";
import CheckBoxIcon from "@/common/icons/CheckBoxIcon";

type Props = {
  label?: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const Checkbox = ({
  label,
  className,
  checked = false,
  onChange,
  ...inputProps
}: Props) => {
  return (
    <div className={"flex items-center"}>
      <div
        className={
          "relative h-6 w-6 flex-none cursor-pointer overflow-hidden rounded-md " +
          (!checked && "border border-slate-900 ") +
          className
        }
      >
        {checked && (
          <CheckBoxIcon
            className={"absolute inset-0 h-full w-full bg-green-900"}
          />
        )}
        <input
          type={"checkbox"}
          className={
            "absolute inset-0 h-full w-full flex-initial cursor-pointer opacity-0"
          }
          checked={checked}
          onChange={onChange}
          {...inputProps}
        />
      </div>
      {!!label && (
        <label className={"ml-2 cursor-pointer text-sm text-slate-900"}>
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
