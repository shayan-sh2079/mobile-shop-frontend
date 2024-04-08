"use client";
import IconBtn from "@/common/uiKit/IconBtn";
import CloseRoundedIcon from "@/common/icons/CloseRoundedIcon";
import { useRouter, useSearchParams } from "next/navigation";

const SelectedFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mutableSearchParams = new URLSearchParams(searchParams);

  const brands = searchParams.getAll("brands");

  return (
    <div className={"flex flex-wrap gap-2"}>
      {mutableSearchParams.get("search") && (
        <p
          className={
            "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
          }
        >
          search: {mutableSearchParams.get("search")}
          <IconBtn
            onClick={() => {
              mutableSearchParams.delete("search");
              router.push(`/?${mutableSearchParams.toString()}`);
            }}
          >
            <CloseRoundedIcon />
          </IconBtn>
        </p>
      )}
      {brands.map((brand) => (
        <p
          key={brand}
          className={
            "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
          }
        >
          {brand}{" "}
          <IconBtn
            onClick={() => {
              mutableSearchParams.delete("brands", brand);
              router.push(`/?${mutableSearchParams.toString()}`);
            }}
          >
            <CloseRoundedIcon />
          </IconBtn>
        </p>
      ))}
      {mutableSearchParams.get("min_price") &&
        mutableSearchParams.get("max_price") && (
          <p
            className={
              "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
            }
          >
            price: {mutableSearchParams.get("min_price")}$ to{" "}
            {mutableSearchParams.get("max_price")}$
            <IconBtn
              onClick={() => {
                mutableSearchParams.delete("min_price");
                mutableSearchParams.delete("max_price");
                router.push(`/?${mutableSearchParams.toString()}`);
              }}
            >
              <CloseRoundedIcon />
            </IconBtn>
          </p>
        )}
    </div>
  );
};

export default SelectedFilters;
