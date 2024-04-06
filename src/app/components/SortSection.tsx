"use client";
import SortIcon from "@/common/icons/SortIcon";
import { useSearchParams, useRouter } from "next/navigation";

const SORT_OPTIONS = [
  {
    title: "Price: Low to High",
    value: "price",
  },
  {
    title: "Price: High to Low",
    value: "-price",
  },
  {
    title: "Newest",
    value: "newest",
  },
  {
    title: "Most Sells",
    value: "sells",
  },
  {
    title: "Highest Rate",
    value: "rate",
  },
];

const SortSection = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const mutableSearchParams = new URLSearchParams(searchParams);

  return (
    <div className={"flex items-center gap-4 border-b border-gray-300 pb-2"}>
      <p className={"flex items-center font-medium"}>
        <SortIcon className={"mr-1"} /> Sort By:
      </p>
      {SORT_OPTIONS.map((option, idx) => (
        <button
          className={
            option.value === searchParams.get("order")
              ? "text-red-500"
              : "text-gray-700 hover:text-gray-500"
          }
          onClick={() => {
            mutableSearchParams.set("order", option.value);
            router.push(`/?${mutableSearchParams.toString()}`);
          }}
          key={idx}
        >
          {option.title}
        </button>
      ))}
    </div>
  );
};

export default SortSection;
