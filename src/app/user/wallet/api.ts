import { axiosWithToken } from "@/common/api/axiosInstances";
import { toast } from "react-toastify";
import { FAIL_MSG } from "@/common/constants/general";
import { AxiosError } from "axios";

type TransactionHistoryRes = {
  history: {
    id: number;
    amount: number;
    created_at: string;
    comment: string;
  }[];
  credit: number;
};

export const getTransactionsHistoryAPI = async () => {
  try {
    const { data } = await axiosWithToken.get<TransactionHistoryRes>(
      "/wallets/transactions/",
    );
    return data;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
  }
};

export const addCreditAPI = async (amount: number) => {
  try {
    await axiosWithToken.post<TransactionHistoryRes>("/wallets/transactions/", {
      amount,
    });
    return true;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};
