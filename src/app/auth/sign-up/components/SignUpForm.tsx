"use client";
import Input from "@/common/uiKit/Input";
import Button from "@/common/uiKit/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  emailValidation,
  passValidation,
  REPEAT_PASS_ERR,
  requiredFieldValidation,
} from "@/common/functions/formValidations";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpAPI } from "@/app/auth/sign-up/api";
import { useState } from "react";
import EyeSlashIcon from "@/common/icons/EyeSlashIcon";
import EyeIcon from "@/common/icons/EyeIcon";
import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  pass: string;
  repeatPass: string;
};

const validationSchema = z
  .object({
    email: emailValidation,
    pass: passValidation,
    repeatPass: requiredFieldValidation,
  })
  .refine(({ repeatPass, pass }) => repeatPass === pass, {
    message: REPEAT_PASS_ERR,
    path: ["repeatPass"],
  });

const SignUpForm = () => {
  const [showPass, setShowPass] = useState(false);
  const [showRepeatPass, setShowRepeatPass] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: zodResolver(validationSchema) });
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const isSuccessful = await SignUpAPI({
      email: data.email,
      password: data.pass,
    });
    if (isSuccessful) router.push("/auth/sign-in");
  };

  return (
    <form className={"flex flex-col gap-3"} onSubmit={handleSubmit(onSubmit)}>
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
      <Input
        placeholder={"repeat password"}
        {...register("repeatPass")}
        error={errors.repeatPass?.message}
        type={showRepeatPass ? "text" : "password"}
        icon={
          showRepeatPass ? (
            <EyeSlashIcon className={"text-gray-500"} />
          ) : (
            <EyeIcon className={"text-gray-500"} />
          )
        }
        iconProps={{ onClick: () => setShowRepeatPass((prev) => !prev) }}
      />
      <Button type={"submit"} isLoading={isSubmitting}>
        Sign Up
      </Button>
    </form>
  );
};

export default SignUpForm;
