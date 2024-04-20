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
import { SignInAPI } from "@/app/auth/sign-in/api";
import { useState } from "react";
import EyeSlashIcon from "@/common/icons/EyeSlashIcon";
import EyeIcon from "@/common/icons/EyeIcon";
import { useRouter } from "next/navigation";

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const isSuccessful = await SignInAPI({
      email: data.email,
      password: data.pass,
    });
    if (isSuccessful) router.push("/auth/sign-in");
  };

  return (
    <form
      className={"flex flex-col gap-3"}
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
  );
};

export default SignInPage;
