"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "@/common/functions/auth";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();

  if (isLoggedIn()) router.push("/");

  return (
    <div className={"flex h-[calc(100vh_-_81px)] items-center justify-center"}>
      <div
        className={
          "flex w-80 flex-col items-center gap-5 rounded-md border border-gray-300 px-4 py-3"
        }
      >
        <h1 className={"text-2xl font-medium text-slate-900"}>
          {pathname === "/auth/sign-in" ? "Sign In" : "Sign Up"}
        </h1>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
