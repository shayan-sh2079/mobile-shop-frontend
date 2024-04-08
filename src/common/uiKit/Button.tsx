import React from "react";

type Variants = "contained" | "text" | "outlined";

type Props = {
  icon?: React.ReactNode;
  variant?: Variants;
  iconPos?: "left" | "right";
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const getClasses = (variant: Variants) => {
  switch (variant) {
    case "contained":
      return "text-slate-50 bg-yellow-500 disabled:bg-gray-200 disabled:opacity-100";
    case "outlined":
      return "border border-yellow-500 text-yellow-500 disabled:border-gray-200 disabled:text-gray-200 disabled:opacity-100";
    case "text":
      return "text-yellow-500 disabled:text-gray-200 disabled:opacity-100";
    default:
      return "";
  }
};

const Button = ({
  variant = "contained",
  children,
  className,
  iconPos = "right",
  icon,
  isLoading,
  ...btnProps
}: Props) => {
  return (
    <button
      className={
        "group relative flex h-10 items-center justify-center gap-1.5 overflow-hidden rounded-md px-6 text-sm font-medium active:opacity-80 " +
        getClasses(variant) +
        " " +
        className
      }
      disabled={!!isLoading}
      type={"button"}
      {...btnProps}
    >
      <div
        className={
          "pointer-events-none absolute inset-0 h-full w-full group-hover:bg-gray-900/5 group-disabled:hidden"
        }
      />
      {iconPos === "left" && icon}
      {isLoading ? "Loading ..." : children}
      {iconPos === "right" && icon}
    </button>
  );
};

export default Button;
