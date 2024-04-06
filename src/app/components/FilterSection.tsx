"use client";
import Accordion from "@/common/uiKit/Accordion";
import Checkbox from "@/common/uiKit/Checkbox";
import RangeSelector from "@/common/uiKit/RangeSelector";
import { useRouter, useSearchParams } from "next/navigation";

const BRANDS = [
  {
    title: "Samsung",
    value: "samsung",
  },
  { title: "Apple", value: "apple" },
  { title: "Xiaomi", value: "xiaomi" },
  { title: "Nokia", value: "nokia" },
];

const FilterSection = () => {
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
          min={2000}
          max={14000}
          onChange={({ min, max }) => console.log(min, max)}
        />
      </Accordion>
    </div>
  );
};

export default FilterSection;
