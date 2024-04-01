import SortIcon from "@/common/icons/SortIcon";

const SORT_OPTIONS = [
  {
    title: "Price: Low to High",
    value: "lowest_price",
  },
  {
    title: "Price: High to Low",
    value: "highest_price",
  },
  {
    title: "Newest",
    value: "newest",
  },
  {
    title: "Most Sells",
    value: "sells",
  },
  {
    title: "Highest Rate",
    value: "rate",
  },
];

const SortBtn = (props: {
  title: string;
  value: string;
  activeValue: string;
}) => {
  return (
    <button
      className={
        props.value === props.activeValue
          ? "text-red-500"
          : "text-gray-700 hover:text-gray-500"
      }
    >
      {props.title}
    </button>
  );
};

const SortSection = () => {
  return (
    <div
      className={"mt-5 flex items-center gap-4 border-b border-gray-300 pb-2"}
    >
      <p className={"flex items-center font-medium"}>
        <SortIcon className={"mr-1"} /> Sort By:
      </p>
      {SORT_OPTIONS.map((option, idx) => (
        <SortBtn
          title={option.title}
          value={option.value}
          key={idx}
          activeValue={"newest"}
        />
      ))}
    </div>
  );
};

export default SortSection;
