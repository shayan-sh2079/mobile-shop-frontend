"use client";
import DialogWrapper from "@/common/components/DialogWrapper";
import { SORT_OPTIONS } from "@/common/constants/filters";
import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  onClose: () => void;
};

const SortDialog = (props: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mutableSearchParams = new URLSearchParams(searchParams);

  return (
    <DialogWrapper title={"Sort"} onClose={props.onClose}>
      <div className={"flex flex-col items-center gap-4"}>
        {SORT_OPTIONS.map((option, idx) => (
          <button
            key={idx}
            className={
              "max-w-60 border-b py-2 " +
              (option.value === searchParams.get("order")
                ? "border-red-300 text-red-500"
                : "border-gray-300 text-gray-700")
            }
            onClick={() => {
              props.onClose();
              mutableSearchParams.set("order", option.value);
              router.push(`/?${mutableSearchParams.toString()}`);
            }}
          >
            {option.title}
          </button>
        ))}
      </div>
    </DialogWrapper>
  );
};

export default SortDialog;
