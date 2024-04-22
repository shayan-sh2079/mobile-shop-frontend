"use client";
import Input from "@/common/uiKit/Input";
import Button from "@/common/uiKit/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  emailValidation,
  requiredFieldValidation,
} from "@/common/functions/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { getOrderAPI, signInAPI } from "@/app/auth/sign-in/api";
import { useState } from "react";
import EyeSlashIcon from "@/common/icons/EyeSlashIcon";
import EyeIcon from "@/common/icons/EyeIcon";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { addToCartAPI } from "@/common/api/cart";
import useCart from "@/common/store/useCart";

type Inputs = {
  email: string;
  pass: string;
};

const validationSchema = z.object({
  email: emailValidation,
  pass: requiredFieldValidation,
});

const SignInPage = () => {
  const [showPass, setShowPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(validationSchema) });
  const router = useRouter();
  const cartItems = useCart();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const isSuccessful = await signInAPI({
      email: data.email,
      password: data.pass,
    });
    if (isSuccessful) {
      if (cartItems.isAnonymous && cartItems.phones.length > 0) {
        const newCartData = await addToCartAPI({
          phones: cartItems.phones,
          quantities: cartItems.quantities,
        });
        if (newCartData) cartItems.setCart(newCartData);
      } else {
        const newCartData = await getOrderAPI();
        if (newCartData) cartItems.setCart(newCartData);
      }
    }
    router.push("/");
  };

  return (
    <>
      <form
        className={"flex w-full flex-col gap-3"}
        onSubmit={handleSubmit(onSubmit)}
        autoComplete={"off"}
      >
        <Input
          placeholder={"email"}
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          placeholder={"password"}
          {...register("pass")}
          error={errors.pass?.message}
          type={showPass ? "text" : "password"}
          icon={
            showPass ? (
              <EyeSlashIcon className={"text-gray-500"} />
            ) : (
              <EyeIcon className={"text-gray-500"} />
            )
          }
          iconProps={{ onClick: () => setShowPass((prev) => !prev) }}
        />
        <Button type={"submit"} isLoading={isSubmitting}>
          Sign In
        </Button>
      </form>
      <div className={"flex w-full justify-between"}>
        <p>Don&apos;t have an account?</p>
        <Link href={"/auth/sign-up"} className={"text-sm text-sky-700"}>
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
