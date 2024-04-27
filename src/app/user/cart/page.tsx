import { isLoggedInServer } from "@/common/functions/authServer";
import { redirect } from "next/navigation";
import UserCartContent from "@/app/user/cart/components/UserCartContent";
import { getOrderAPI } from "@/common/api/cart";

const CartPage = async () => {
  if (!isLoggedInServer()) redirect("/auth/sign-in");

  const cartData = await getOrderAPI();

  return <UserCartContent cartData={cartData} />;
};

export default CartPage;
