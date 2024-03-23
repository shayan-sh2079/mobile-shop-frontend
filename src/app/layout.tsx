import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Roboto_Serif } from "next/font/google";
import "@/app/global.css";
import React from "react";
import Input from "@/common/uiKit/Input";
import SearchIcon from "@/common/icons/SearchIcon";
import IconBtn from "@/common/uiKit/IconBtn";
import PersonIcon from "@/common/icons/PersonIcon";
import CartIcon from "@/common/icons/CartIcon";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mobile Shop",
  description: "A sample project with Nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={robotoSerif.className}>
      <body>
        <header className={"sticky top-0 border-b border-gray-300 shadow"}>
          <div
            className={
              "mx-auto flex h-20 w-full max-w-screen-2xl items-center justify-between lg:px-6"
            }
          >
            <div className={"flex items-center gap-6"}>
              <h1 className={"text-4xl font-bold text-yellow-400"}>
                MOBILE SHOP
              </h1>
              <Input
                placeholder={"search..."}
                className={"w-80"}
                icon={<SearchIcon className={"fill-gray-500"} />}
              />
            </div>
            <div className={"flex items-center gap-2"}>
              <IconBtn>
                <PersonIcon className={"fill-gray-600"} />
              </IconBtn>
              <hr className={"h-5 w-px bg-gray-400"} />
              <IconBtn>
                <CartIcon className={"fill-gray-600"} />
              </IconBtn>
            </div>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
