import { axiosWithToken } from "@/common/api/axiosInstances";
import { toast } from "react-toastify";
import { CART, FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";
import { AxiosError } from "axios";
import { OrderRes } from "@/common/types/general";

export const addToCartAPI = async (
  showSuccess = false,
  phoneId?: number,
  count?: number,
) => {
  try {
    const cartItems: Record<number, number> = JSON.parse(
      localStorage.getItem(CART) || "{}",
    );
    if (phoneId !== undefined && count !== undefined)
      cartItems[phoneId] = count;
    const res = await axiosWithToken.post<OrderRes>("/orders/order/", {
      mobiles: Object.keys(cartItems).map((id) => +id),
      quantities: Object.values(cartItems),
    });

    const newCartItems: Record<number, number> = {};
    res.data.items?.forEach((item) => {
      newCartItems[item.mobile.id] = item.quantity;
    });
    localStorage.setItem(CART, JSON.stringify(newCartItems));
    showSuccess && toast.success(SUCCESS_MSG);
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};
