"use client";
import React, { useEffect, useState } from "react";
import ArrowRightIcon from "@/common/icons/ArrowRightIcon";

type Props = {
  title: string;
  children: React.ReactNode;
};

const Accordion = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isOpen)
      timeoutId = setTimeout(() => {
        setHasOverflow(true);
      }, 700);
    else setHasOverflow(false);

    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  return (
    <div className={"flex flex-col border-b border-gray-200 py-6"}>
      <div
        className={
          "flex w-full cursor-pointer items-center justify-between rounded-md active:bg-gray-200"
        }
        onClick={() => setIsOpen(!isOpen)}
      >
        <p
          className={
            "font-medium " + (isOpen ? "text-slate-900" : "text-gray-700")
          }
        >
          {props.title}
        </p>
        <ArrowRightIcon
          className={"text-slate-900 " + (isOpen ? "-rotate-90" : "rotate-90")}
        />
      </div>
      <div
        className={
          "flex flex-col gap-4 transition-all duration-700 [&>*:first-child]:mt-6 " +
          (hasOverflow ? "overflow-auto " : "overflow-hidden ") +
          (isOpen ? "max-h-96" : "max-h-0 overflow-hidden")
        }
      >
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
