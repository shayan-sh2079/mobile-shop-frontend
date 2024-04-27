"use client";
import MinusIcon from "@/common/icons/MinusIcon";
import PlusIcon from "@/common/icons/PlusIcon";
import Button from "@/common/uiKit/Button";
import { useState } from "react";

type Props = {
  phoneId: number;
  count: number;
  price: number;
  onEdit: (phoneId: number, count: number) => void;
  onRemove: (phoneId: number) => void;
  isLoading: boolean;
};

const EditCartSection = (props: Props) => {
  const [count, setCount] = useState(props.count);

  return (
    <div className={"flex h-fit w-1/3 flex-col items-center gap-6 p-4"}>
      <div className={"flex overflow-hidden rounded-md border border-gray-300"}>
        <button
          className={
            "group flex items-center justify-center p-2 hover:bg-gray-100 active:opacity-70"
          }
          onClick={() => {
            if (count > 1) setCount(count - 1);
          }}
          disabled={count <= 1}
        >
          <MinusIcon className={"h-8 w-8 group-disabled:fill-gray-400"} />
        </button>
        <input
          type={"number"}
          className={"w-full text-center text-xl outline-none"}
          value={count}
          onChange={(e) => {
            if (+e.target.value >= 1 && +e.target.value <= 1000)
              setCount(+e.target.value);
          }}
        />
        <button
          className={
            "flex items-center justify-center p-2 hover:bg-gray-100 active:opacity-70"
          }
          onClick={() => count < 1000 && setCount(count + 1)}
        >
          <PlusIcon className={"h-8 w-8"} />
        </button>
      </div>
      <p className={"text-2xl font-medium text-red-500"}>
        <span className={"text-xl"}>total:</span>{" "}
        {(props.price * count).toLocaleString()}$
      </p>
      <div className={"flex gap-4"}>
        <Button
          onClick={() => props.onEdit(props.phoneId, count)}
          isLoading={props.isLoading}
          disabled={count === props.count}
        >
          Modify Cart
        </Button>
        <Button
          color={"secondary"}
          variant={"outlined"}
          onClick={() => props.onRemove(props.phoneId)}
          isLoading={props.isLoading}
        >
          Remove from Cart
        </Button>
      </div>
    </div>
  );
};

export default EditCartSection;
