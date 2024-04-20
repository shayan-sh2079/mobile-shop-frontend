import { noTokenAxios } from "@/common/api/axiosInstances";
import { toast } from "react-toastify";
import { FAIL_MSG, SUCCESS_MSG } from "@/common/constants/general";
import { AxiosError } from "axios";

type SignUpData = {
  email: string;
  password: string;
};

export const signUpAPI = async (data: SignUpData) => {
  try {
    await noTokenAxios.post("/users/register/", data);
    toast.success(SUCCESS_MSG);
    return true;
  } catch (e: unknown) {
    if (e instanceof AxiosError)
      toast.error(e.response?.data.message || e.message || FAIL_MSG);
    return false;
  }
};
