import { getOrderAPI } from "@/app/auth/sign-in/api";
import { isLoggedInServer } from "@/common/functions/authServer";
import { redirect } from "next/navigation";
import UserCartContent from "@/app/user/cart/components/UserCartContent";

const CartPage = async () => {
  if (!isLoggedInServer()) redirect("/auth/sign-in");

  const cartData = await getOrderAPI();

  return <UserCartContent cartData={cartData} />;
};

export default CartPage;
