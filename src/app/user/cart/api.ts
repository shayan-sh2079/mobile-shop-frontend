import { axiosWithToken } from "@/common/api/axiosInstances";
import { OrderRes } from "@/common/types/general";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { FAIL_MSG } from "@/common/constants/general";

export const editCartItemAPI = async (phoneId: number, count: number) => {
  try {
    const res = await axiosWithToken.patch<OrderRes>("/orders/order/", {
      mobiles: [phoneId],
      quantities: [count],
    });
    return res.data;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};
