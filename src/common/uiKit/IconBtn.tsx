import React from "react";

const IconBtn = ({
  className,
  children,
  ...btnProps
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>) => {
  return (
    <button
      className={
        "group relative overflow-hidden rounded-full p-1 active:opacity-80 " +
        className
      }
      type={"button"}
      {...btnProps}
    >
      <div
        className={
          "pointer-events-none absolute inset-0 h-full w-full group-hover:bg-gray-800/5"
        }
      />
      {children}
    </button>
  );
};

export default IconBtn;
