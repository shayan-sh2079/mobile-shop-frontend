import { Mobile } from "@/common/types/general";
import MobileCard from "@/app/components/MobileCard";

export const revalidate = 5;

const Home = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT + "/mobiles/");
  if (!res.ok) return null;

  const mobiles: Mobile[] = await res.json();

  return (
    <section className={"grid grid-cols-3 gap-6 xl:grid-cols-4"}>
      {mobiles.map((mobile) => (
        <MobileCard key={mobile.id} mobile={mobile} />
      ))}
    </section>
  );
};

export default Home;
