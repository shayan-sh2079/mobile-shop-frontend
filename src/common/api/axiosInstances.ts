import axios from "axios";
import Cookies from "js-cookie";
import { ACCESS_TKN_TIME, ATK, RTK } from "@/common/constants/general";

const isServer = typeof window === "undefined";

export const noTokenAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
});

export const axiosWithToken = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ROOT,
});

const accessTokenExpirationDate = new Date(
  new Date().getTime() + ACCESS_TKN_TIME,
);

// Request interceptor for API calls
axiosWithToken.interceptors.request.use(
  async (config) => {
    if (isServer) {
      const { cookies } = await import("next/headers");
      const accessToken = cookies().get(ATK)?.value;

      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      else if (cookies().get(RTK)?.value) {
        const refreshToken = cookies().get(RTK)?.value;
        const res = await noTokenAxios.post<{ access: string }>(
          "/users/token/refresh/",
          {
            refresh: refreshToken,
          },
        );

        config.headers["Authorization"] = `Bearer ${res.data.access}`;
      }
    } else {
      const accessToken = Cookies.get(ATK);

      if (accessToken)
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      else if (Cookies.get(RTK)) {
        const refreshToken = Cookies.get(RTK);
        const res = await noTokenAxios.post<{ access: string }>(
          "/users/token/refresh/",
          {
            refresh: refreshToken,
          },
        );
        Cookies.set(ATK, res.data.access, {
          expires: accessTokenExpirationDate,
        });

        config.headers["Authorization"] = `Bearer ${res.data.access}`;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);
