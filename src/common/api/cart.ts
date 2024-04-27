import { axiosWithToken } from "@/common/api/axiosInstances";
import { toast } from "react-toastify";
import { FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";
import { AxiosError } from "axios";
import { OrderRes } from "@/common/types/general";

export const addToCartAPI = async (
  cartItems: { phones: number[]; quantities: number[] },
  showSuccess = false,
) => {
  try {
    const res = await axiosWithToken.post<OrderRes>("/orders/order/", {
      mobiles: cartItems.phones,
      quantities: cartItems.quantities,
    });
    showSuccess && toast.success(SUCCESS_MSG);

    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};

export const getOrderAPI = async () => {
  try {
    const res = await axiosWithToken.get<OrderRes>("/orders/order/");
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError && typeof window !== "undefined")
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};
