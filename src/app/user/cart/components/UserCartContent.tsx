"use client";
import Image from "next/image";
import EditCartSection from "@/app/user/cart/components/EditCartSection";
import { OrderRes } from "@/common/types/general";
import { useState } from "react";
import {
  buyItemsAPI,
  deleteCartItemAPI,
  editCartItemAPI,
} from "@/app/user/cart/api";
import useCart from "@/common/store/useCart";
import Button from "@/common/uiKit/Button";
import { useRouter } from "next/navigation";

type Props = {
  cartData?: OrderRes;
};

const UserCartContent = (props: Props) => {
  const [cartData, setCartData] = useState(props.cartData);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const cartItems = useCart();

  const onRemoveHandler = async (phoneId: number) => {
    setIsLoading(true);
    const isSuccessful = await deleteCartItemAPI(phoneId);
    if (isSuccessful && cartData) {
      const newCartItems = cartData.items.filter(
        (item) => item.mobile.id !== phoneId,
      );
      cartItems.setCart({ items: newCartItems });
      setCartData({ items: newCartItems });
    }
    setIsLoading(false);
  };

  const onEditHandler = async (phoneId: number, count: number) => {
    setIsLoading(true);
    const newCartData = await editCartItemAPI(phoneId, count);
    if (newCartData) cartItems.setCart(newCartData);
    setCartData(newCartData);
    setIsLoading(false);
  };

  const buyHandler = async () => {
    setIsLoading(true);
    const isSuccessful = await buyItemsAPI();
    setIsLoading(false);
    if (isSuccessful) {
      cartItems.removeCart();
      router.push("/user/history/");
    }
  };

  if (!cartData?.items.length) return <div>You have no items in your cart</div>;

  return (
    <div className={"my-10 flex flex-col gap-4"}>
      {cartData.items.map((item) => (
        <div
          key={item.id}
          className={
            "flex justify-between gap-10 border-b border-yellow-500 p-4"
          }
        >
          <Image
            src={item.mobile.images[0]}
            alt={""}
            width={300}
            height={300}
          />
          <div className={"mr-auto"}>
            <p className={"text-2xl font-medium text-amber-600"}>
              {item.mobile.name}
            </p>
            <p className={"mt-10 text-lg font-medium text-green-600"}>
              <span className={"text-lg"}>price per phone: </span>
              {item.mobile.price.toLocaleString()}$
            </p>
          </div>
          <EditCartSection
            phoneId={item.mobile.id}
            price={item.mobile.price}
            count={item.quantity}
            onEdit={onEditHandler}
            onRemove={onRemoveHandler}
            isLoading={isLoading}
          />
        </div>
      ))}
      <div>
        <Button onClick={buyHandler} isLoading={isLoading}>
          Buy Items
        </Button>
      </div>
    </div>
  );
};

export default UserCartContent;
