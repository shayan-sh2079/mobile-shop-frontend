import IconBtn from "@/common/uiKit/IconBtn";
import CloseRoundedIcon from "@/common/icons/CloseRoundedIcon";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

type Props = {
  brands: string[];
  mutableSearchParams: URLSearchParams;
  router: AppRouterInstance;
};

const SelectedFilters = (props: Props) => {
  return (
    <div className={"flex flex-wrap gap-2"}>
      {props.mutableSearchParams.get("search") && (
        <p
          className={
            "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
          }
        >
          search: {props.mutableSearchParams.get("search")}
          <IconBtn
            onClick={() => {
              props.mutableSearchParams.delete("search");
              props.router.push(`/?${props.mutableSearchParams.toString()}`);
            }}
          >
            <CloseRoundedIcon />
          </IconBtn>
        </p>
      )}
      {props.brands.map((brand) => (
        <p
          key={brand}
          className={
            "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
          }
        >
          {brand}{" "}
          <IconBtn
            onClick={() => {
              props.mutableSearchParams.delete("brands", brand);
              props.router.push(`/?${props.mutableSearchParams.toString()}`);
            }}
          >
            <CloseRoundedIcon />
          </IconBtn>
        </p>
      ))}
      {props.mutableSearchParams.get("min_price") &&
        props.mutableSearchParams.get("max_price") && (
          <p
            className={
              "flex items-center rounded-md border border-gray-500 bg-neutral-50 px-1 text-xs"
            }
          >
            price: {props.mutableSearchParams.get("min_price")}$ to{" "}
            {props.mutableSearchParams.get("max_price")}$
            <IconBtn
              onClick={() => {
                props.mutableSearchParams.delete("min_price");
                props.mutableSearchParams.delete("max_price");
                props.router.push(`/?${props.mutableSearchParams.toString()}`);
              }}
            >
              <CloseRoundedIcon />
            </IconBtn>
          </p>
        )}
    </div>
  );
};

export default SelectedFilters;
