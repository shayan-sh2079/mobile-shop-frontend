import { cookies } from "next/headers";
import { ATK, RTK } from "@/common/constants/general";

export const isLoggedInServer = () =>
  !!cookies().get(ATK) || !!cookies().get(RTK);
