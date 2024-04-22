"use client";
import CartIcon from "@/common/icons/CartIcon";
import React from "react";
import IconBtn from "@/common/uiKit/IconBtn";
import useCart from "@/common/store/useCart";
import Link from "next/link";

const CartBtn = () => {
  const data = useCart();
  return (
    <Link className={"relative"} href={"/user/cart"}>
      <IconBtn>
        <CartIcon className={"fill-gray-600"} />
      </IconBtn>
      <span
        className={
          "pointer-events-none absolute top-full -ml-5 -mt-3 rounded-full bg-red-500 px-1 text-xs text-gray-50"
        }
      >
        {data.quantities.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        )}
      </span>
    </Link>
  );
};

export default CartBtn;
