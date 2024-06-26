import { noTokenAxios } from "@/common/api/axiosInstances";
import { setTokens } from "@/common/functions/auth";
import { toast } from "react-toastify";
import { FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";
import { AxiosError } from "axios";

type SignInData = {
  email: string;
  password: string;
};

type SignInRes = {
  access: string;
  refresh: string;
};

export const signInAPI = async (data: SignInData) => {
  try {
    const res = await noTokenAxios.post<SignInRes>("/users/token/", data);
    setTokens(res.data.refresh, res.data.access);
    toast.success(SUCCESS_MSG);
    return true;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};
