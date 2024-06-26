import { Phone } from "@/common/types/general";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@/common/icons/StarIcon";
import CompanyIcon from "@/common/icons/CompanyIcon";

type Props = {
  phone: Phone;
};

const PhoneCard = ({ phone }: Props) => {
  return (
    <Link
      href={`/phone/${phone.id}/${encodeURIComponent(phone.name)}`}
      className={
        "col-span-1 rounded-md border border-gray-300 p-3 hover:shadow-lg"
      }
    >
      <Image
        src={phone.images[0]}
        alt={`${phone.name} image`}
        width={240}
        height={240}
        className={"mx-auto h-[240px] w-[240px]"}
      />
      <h3
        className={"mt-3.5 h-12 overflow-hidden overflow-ellipsis font-medium"}
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {phone.name}
      </h3>
      <p className={"flex items-center gap-1 text-gray-600"}>
        <CompanyIcon className={"mb-0.5"} />
        {phone.brand}
      </p>
      <p className={"my-0.5 flex items-center gap-1"}>
        <StarIcon className={"mb-0.5 fill-yellow-400"} />
        {phone.score}
      </p>
      <p className={"text-slate-800"}>{phone.price.toLocaleString()} $</p>
    </Link>
  );
};

export default PhoneCard;
