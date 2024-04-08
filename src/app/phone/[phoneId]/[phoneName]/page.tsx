import { Phone } from "@/common/types/general";
import PhoneImages from "@/app/phone/[phoneId]/[phoneName]/components/PhoneImages";

export const revalidate = 0;

const PhonePage = async ({ params }: { params: { phoneId: number } }) => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_ROOT + `/mobiles/${params.phoneId}/`,
  );

  if (!res.ok) return null;

  const phone: Phone = await res.json();

  return (
    <div className={"mt-6 flex gap-20 lg:mt-14"}>
      <PhoneImages images={phone.images} alt={phone.name} />
      <div className={""}>
        <h1 className={"text-3xl font-medium text-slate-900"}>{phone.name}</h1>
      </div>
      <div>{phone.price}</div>
    </div>
  );
};

export default PhonePage;
