import { Mobile } from "@/common/types/general";
import MobileCard from "@/app/components/MobileCard";
import SortSection from "@/app/components/SortSection";

export const revalidate = 5;

const Home = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT + "/mobiles/");
  if (!res.ok) return null;

  const mobiles: Mobile[] = await res.json();

  return (
    <div>
      <SortSection />
      <section className={"mt-10 grid grid-cols-3 gap-6 xl:grid-cols-4"}>
        {mobiles.map((mobile) => (
          <MobileCard key={mobile.id} mobile={mobile} />
        ))}
      </section>
    </div>
  );
};

export default Home;
