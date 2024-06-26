import type { Metadata } from "next";
// eslint-disable-next-line camelcase
import { Roboto_Serif } from "next/font/google";
import "@/app/global.css";
import React from "react";
import IconBtn from "@/common/uiKit/IconBtn";
import PersonIcon from "@/common/icons/PersonIcon";
import SearchInput from "@/app/components/SearchInput";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartBtn from "@/app/components/CartBtn";

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phone Shop",
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
        <header
          className={
            "sticky top-0 z-40 border-b border-gray-300 bg-neutral-50 shadow"
          }
        >
          <div
            className={
              "mx-auto flex h-14 w-full max-w-screen-2xl items-center justify-between px-4 lg:h-20 lg:px-6"
            }
          >
            <div className={"flex items-center gap-6"}>
              <h1 className={"text-2xl font-bold text-yellow-400 lg:text-4xl"}>
                PHONE SHOP
              </h1>
              <SearchInput />
            </div>
            <div className={"flex items-center gap-2"}>
              <IconBtn>
                <PersonIcon className={"fill-gray-600"} />
              </IconBtn>
              <hr className={"h-5 w-px bg-gray-400"} />
              <CartBtn />
            </div>
          </div>
        </header>
        <main className={"mx-auto max-w-screen-2xl px-4 lg:px-6"}>
          {children}
        </main>
        <ToastContainer
          limit={3}
          theme='dark'
          position={"top-center"}
          toastClassName={"lg:!rounded-md"}
        />
      </body>
    </html>
  );
}
