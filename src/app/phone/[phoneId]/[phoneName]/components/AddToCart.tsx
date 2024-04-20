"use client";
import Button from "@/common/uiKit/Button";
import { ANON_CART, ATK, RTK, SUCCESS_MSG } from "@/common/constants/general";
import Cookies from "js-cookie";
import { useState } from "react";
import { addToCartAPI } from "@/app/phone/[phoneId]/[phoneName]/api";
import PlusIcon from "@/common/icons/PlusIcon";
import MinusIcon from "@/common/icons/MinusIcon";
import { toast } from "react-toastify";

type Props = {
  price: number;
  phoneId: number;
};

const AddToCart = (props: Props) => {
  const [count, setCount] = useState(1);
  const addToCartHandler = async () => {
    if (Cookies.get(ATK) || Cookies.get(RTK)) {
      await addToCartAPI({ mobile: props.phoneId, quantity: count });
    } else {
      const cartItems: Record<number, number> = JSON.parse(
        localStorage.getItem(ANON_CART) || "{}",
      );
      cartItems[props.phoneId] = count;
      localStorage.setItem(ANON_CART, JSON.stringify(cartItems));
      toast.success(SUCCESS_MSG);
    }
  };

  return (
    <div
      className={
        "flex h-fit w-1/3 flex-col items-center gap-6 rounded-md border border-yellow-500 p-4"
      }
    >
      <p className={"text-2xl font-medium text-green-600"}>
        <span className={"text-xl"}>per item:</span>{" "}
        {props.price.toLocaleString()}$
      </p>
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
      <Button onClick={addToCartHandler}>Add to Cart</Button>
    </div>
  );
};

export default AddToCart;
