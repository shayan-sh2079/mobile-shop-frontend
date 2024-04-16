import { axiosWithToken } from "@/common/api/axiosInstances";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";

type AddToCartData = {
  mobile: number;
  quantity: number;
};

export const addToCartAPI = async (data: AddToCartData) => {
  try {
    await axiosWithToken.post("/orders/order/", data);
    toast.success(SUCCESS_MSG);
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};
