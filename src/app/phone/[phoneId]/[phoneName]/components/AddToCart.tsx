"use client";
import Button from "@/common/uiKit/Button";
import { ATK, RTK, SUCCESS_MSG } from "@/common/constants/general";
import Cookies from "js-cookie";
import { useState } from "react";
import PlusIcon from "@/common/icons/PlusIcon";
import MinusIcon from "@/common/icons/MinusIcon";
import { toast } from "react-toastify";
import { addToCartAPI } from "@/common/api/cart";
import useCart from "@/common/store/useCart";

type Props = {
  price: number;
  phoneId: number;
};

const AddToCart = (props: Props) => {
  const [count, setCount] = useState(1);
  const cartItems = useCart();

  const addToCartHandler = async () => {
    const newCartItems: { phones: number[]; quantities: number[] } = {
      phones: [...cartItems.phones],
      quantities: [...cartItems.quantities],
    };
    const newPhoneIdx = newCartItems.phones.findIndex(
      (phone) => phone === props.phoneId,
    );
    if (newPhoneIdx !== -1) {
      newCartItems.quantities[newPhoneIdx] = count;
    } else {
      newCartItems.phones.push(props.phoneId);
      newCartItems.quantities.push(count);
    }

    if (Cookies.get(ATK) || Cookies.get(RTK)) {
      const newCartData = await addToCartAPI(newCartItems, true);
      if (newCartData) {
        cartItems.setCart(newCartData);
      }
    } else {
      cartItems.setAnonCart(newCartItems);
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
