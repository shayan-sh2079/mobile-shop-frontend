"use client";
import Button from "@/common/uiKit/Button";
import FilterIcon from "@/common/icons/FilterIcon";
import SortIcon from "@/common/icons/SortIcon";
import useBreakpoint from "@/common/hooks/useBreakpoint";
import { useState } from "react";
import dynamic from "next/dynamic";

type Props = {
  price: { min: number; max: number };
};

const SortDialogDynamic = dynamic(() => import("@/app/components/SortDialog"), {
  ssr: false,
});
const FiltersDialogDynamic = dynamic(
  () => import("@/app/components/FiltersDialog"),
  { ssr: false },
);

const FilterSectionMobile = (props: Props) => {
  const isDesktop = useBreakpoint();
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  if (isDesktop) return null;

  return (
    <>
      <div className={"grid grid-cols-2 gap-2 lg:hidden"}>
        <Button
          className={"col-span-1"}
          icon={<FilterIcon />}
          onClick={() => setIsFiltersOpen(true)}
        >
          Filters
        </Button>
        <Button
          className={"col-span-1"}
          iconPos={"left"}
          icon={<SortIcon />}
          onClick={() => setIsSortOpen(true)}
        >
          Sort
        </Button>
      </div>
      {isSortOpen && <SortDialogDynamic onClose={() => setIsSortOpen(false)} />}
      {isFiltersOpen && (
        <FiltersDialogDynamic
          onClose={() => setIsFiltersOpen(false)}
          price={props.price}
        />
      )}
    </>
  );
};

export default FilterSectionMobile;
