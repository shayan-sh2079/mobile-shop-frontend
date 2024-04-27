import Cookies from "js-cookie";
import {
  ACCESS_TKN_TIME,
  ATK,
  REFRESH_TKN_TIME,
  RTK,
} from "@/common/constants/general";

export const isLoggedIn = () => !!Cookies.get(ATK) || !!Cookies.get(RTK);

export const setTokens = (refreshTkn: string, accessTkn: string) => {
  const refreshTokenExpirationDate = new Date(
    new Date().getTime() + REFRESH_TKN_TIME,
  );
  const accessTokenExpirationDate = new Date(
    new Date().getTime() + ACCESS_TKN_TIME,
  );

  Cookies.set(ATK, accessTkn, { expires: accessTokenExpirationDate });
  Cookies.set(RTK, refreshTkn, { expires: refreshTokenExpirationDate });
};
