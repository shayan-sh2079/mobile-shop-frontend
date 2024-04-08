import { Mobile } from "@/common/types/general";
import Image from "next/image";
import Link from "next/link";
import StarIcon from "@/common/icons/StarIcon";
import CompanyIcon from "@/common/icons/CompanyIcon";

type Props = {
  mobile: Mobile;
};

const MobileCard = ({ mobile }: Props) => {
  return (
    <Link
      href={`/mobile/${mobile.id}/${encodeURIComponent(mobile.name)}`}
      className={
        "col-span-1 rounded-md border border-gray-300 p-3 hover:shadow-lg"
      }
    >
      <Image
        src={mobile.images[0]}
        alt={`${mobile.name} image`}
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
        {mobile.name}
      </h3>
      <p className={"flex items-center gap-1 text-gray-600"}>
        <CompanyIcon className={"mb-0.5"} />
        {mobile.brand}
      </p>
      <p className={"my-0.5 flex items-center gap-1"}>
        <StarIcon className={"mb-0.5 fill-yellow-400"} />
        {mobile.score}
      </p>
      <p className={"text-slate-800"}>{mobile.price.toLocaleString()} $</p>
    </Link>
  );
};

export default MobileCard;
