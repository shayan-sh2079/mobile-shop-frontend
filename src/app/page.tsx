import { Phone, SearchParams } from "@/common/types/general";
import PhoneCard from "@/app/components/PhoneCard";
import SortSection from "@/app/components/SortSection";
import FilterSection from "@/app/components/FilterSection";
import SelectedFilters from "@/app/components/SelectedFilters";
import FilterSectionPhone from "@/app/components/FilterSectionPhone";

export const revalidate = 5;

const getSearchQuery = (searchParams: SearchParams) => {
  const query = searchParams?.["order"] ? `o=${searchParams["order"]}` : "";
  const searchParam = new URLSearchParams(query);
  if (typeof searchParams?.["brands"] === "string")
    searchParam.set("brands", searchParams["brands"]);
  else if (Array.isArray(searchParams?.["brands"])) {
    for (const i in searchParams["brands"]) {
      searchParam.append("brands", searchParams["brands"][i]);
    }
  }
  if (searchParams && "min_price" in searchParams) {
    searchParam.set("price__gte", searchParams.min_price as string);
    searchParam.set("price__lte", searchParams.max_price as string);
  }

  if (searchParams && "search" in searchParams)
    searchParam.set("search", searchParams.search as string);

  return searchParam.toString();
};

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ROOT +
      "/mobiles/?" +
      getSearchQuery(searchParams),
  );
  if (!res.ok) return null;

  const phones: {
    result: Phone[];
    lowest_price: number;
    highest_price: number;
  } = await res.json();

  return (
    <div className={"mt-6 flex w-full flex-col gap-4 lg:mt-14 lg:flex-row"}>
      <FilterSectionPhone
        price={{ min: phones.lowest_price, max: phones.highest_price }}
      />
      <FilterSection
        price={{ min: phones.lowest_price, max: phones.highest_price }}
      />
      <div className={"lg:hidden"}>
        <SelectedFilters />
      </div>
      <div className={"basis-full lg:basis-3/4 xl:basis-5/6"}>
        <SortSection />
        <section
          className={
            "grid grid-cols-1 gap-6 lg:mt-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          }
        >
          {phones.result.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
