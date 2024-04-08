"use client";
import SearchIcon from "@/common/icons/SearchIcon";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import IconBtn from "@/common/uiKit/IconBtn";
import CloseRoundedIcon from "@/common/icons/CloseRoundedIcon";

const SearchInput = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const mutableSearchParams = new URLSearchParams(searchParams);

  useEffect(() => {
    setSearch(searchParams.get("search") || "");
  }, [searchParams.get("search")]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutableSearchParams.set("search", search);
        router.push(`/?${mutableSearchParams.toString()}`);
      }}
      className={"hidden lg:block"}
    >
      <div
        className={
          "flex w-80 justify-between rounded-md border border-slate-300 px-3 py-2"
        }
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={"search..."}
          className={"mr-auto bg-transparent outline-none"}
        />
        {search && (
          <IconBtn
            onClick={() => {
              if (!searchParams.get("search")) setSearch("");
              else {
                mutableSearchParams.delete("search");
                router.push(`/?${mutableSearchParams.toString()}`);
              }
            }}
          >
            <CloseRoundedIcon className={"text-gray-500"} />
          </IconBtn>
        )}
        <IconBtn type={"submit"}>
          <SearchIcon className={"fill-gray-500"} />
        </IconBtn>
      </div>
    </form>
  );
};

export default SearchInput;
