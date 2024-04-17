import { cookies } from "next/headers";
import { ATK } from "@/common/constants/general";

export const isLoggedInServer = () => !!cookies().get(ATK);
