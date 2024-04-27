import { axiosWithToken } from "@/common/api/axiosInstances";
import { OrderRes } from "@/common/types/general";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";

export const editCartItemAPI = async (phoneId: number, count: number) => {
  try {
    const res = await axiosWithToken.patch<OrderRes>(
      `/orders/order/${phoneId}/`,
      {
        count,
      },
    );
    toast.success(SUCCESS_MSG);
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};

export const deleteCartItemAPI = async (phoneId: number) => {
  try {
    await axiosWithToken.delete(`/orders/order/${phoneId}/`);
    toast.success(SUCCESS_MSG);
    return true;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};

export const buyItemsAPI = async () => {
  try {
    await axiosWithToken.post("/orders/buy/");
    toast.success(SUCCESS_MSG);
    return true;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};
