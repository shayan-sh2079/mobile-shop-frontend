import Cookies from "js-cookie";
import { ATK } from "@/common/constants/general";

export const isLoggedIn = () => !!Cookies.get(ATK);
