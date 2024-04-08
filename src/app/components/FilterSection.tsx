import SelectedFilters from "@/app/components/SelectedFilters";
import Filters from "@/app/components/Filters";

type Props = {
  price: { min: number; max: number };
};

const FilterSection = (props: Props) => {
  return (
    <div
      className={
        "hidden w-1/4 basis-1/4 rounded-md border border-gray-300 p-4 lg:block xl:w-1/6 xl:basis-1/6"
      }
    >
      <p className={"mb-5 mt-4 text-2xl text-slate-800"}>Filters</p>
      <SelectedFilters />
      <Filters price={props.price} />
    </div>
  );
};

export default FilterSection;
