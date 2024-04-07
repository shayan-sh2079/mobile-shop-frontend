"use client";
import Accordion from "@/common/uiKit/Accordion";
import Checkbox from "@/common/uiKit/Checkbox";
import RangeSelector from "@/common/uiKit/RangeSelector";
import { useRouter, useSearchParams } from "next/navigation";
import SelectedFilters from "@/app/components/SelectedFilters";

type Props = {
  price: { min: number; max: number };
};

const BRANDS = [
  {
    title: "Samsung",
    value: "samsung",
  },
  { title: "Apple", value: "apple" },
  { title: "Xiaomi", value: "xiaomi" },
  { title: "Nokia", value: "nokia" },
];

const FilterSection = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mutableSearchParams = new URLSearchParams(searchParams);

  const brands = searchParams.getAll("brands");

  return (
    <div
      className={
        "w-1/4 basis-1/4 rounded-md border border-gray-300 p-4 xl:w-1/6 xl:basis-1/6"
      }
    >
      <p className={"mb-5 mt-4 text-2xl text-slate-800"}>Filters</p>
      <SelectedFilters
        brands={brands}
        mutableSearchParams={mutableSearchParams}
        router={router}
      />
      <Accordion title={"Brand"}>
        {BRANDS.map((brand, idx) => (
          <Checkbox
            label={brand.title}
            value={brand.value}
            onChange={() => {
              if (brands.includes(brand.value)) {
                mutableSearchParams.delete("brands", brand.value);
              } else {
                mutableSearchParams.append("brands", brand.value);
              }

              router.push(`/?${mutableSearchParams.toString()}`);
            }}
            checked={brands.includes(brand.value)}
            key={idx}
          />
        ))}
      </Accordion>
      <Accordion title={"Price"}>
        <RangeSelector
          min={props.price.min}
          max={props.price.max}
          initialValues={
            searchParams.get("min_price") !== null &&
            searchParams.get("max_price") !== null
              ? {
                  min: +(searchParams.get("min_price") as string),
                  max: +(searchParams.get("max_price") as string),
                }
              : undefined
          }
          onChange={({ min, max }) => {
            const mutableSearchParams = new URLSearchParams(searchParams);
            mutableSearchParams.set("min_price", min.toString());
            mutableSearchParams.set("max_price", max.toString());
            router.push(`/?${mutableSearchParams.toString()}`);
          }}
        />
      </Accordion>
    </div>
  );
};

export default FilterSection;
