import { Mobile, SearchParams } from "@/common/types/general";
import MobileCard from "@/app/components/MobileCard";
import SortSection from "@/app/components/SortSection";
import FilterSection from "@/app/components/FilterSection";

export const revalidate = 5;

const Home = async ({ searchParams }: { searchParams: SearchParams }) => {
  const query = searchParams?.["order"] ? `o=${searchParams["order"]}` : "";
  const searchParam = new URLSearchParams(query);
  if (typeof searchParams?.["brands"] === "string")
    searchParam.set("brands", searchParams["brands"]);
  else if (Array.isArray(searchParams?.["brands"])) {
    for (const i in searchParams["brands"]) {
      searchParam.append("brands", searchParams["brands"][i]);
    }
  }

  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ROOT + "/mobiles/?" + searchParam.toString(),
  );
  if (!res.ok) return null;

  const mobiles: {
    result: Mobile[];
    lowest_price: number;
    highest_price: number;
  } = await res.json();

  return (
    <div className={"mt-14 flex gap-4"}>
      <FilterSection />
      <div className={"basis-3/4 xl:basis-5/6"}>
        <SortSection />
        <section className={"mt-10 grid grid-cols-3 gap-6 xl:grid-cols-4"}>
          {mobiles.result.map((mobile) => (
            <MobileCard key={mobile.id} mobile={mobile} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Home;
