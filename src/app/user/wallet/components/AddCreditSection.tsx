"use client";
import Input from "@/common/uiKit/Input";
import Button from "@/common/uiKit/Button";
import { useState } from "react";
import { addCreditAPI } from "@/app/user/wallet/api";
import { useRouter } from "next/navigation";

const numRegex = /^\d*$/;

const AddCreditSection = () => {
  const [amount, setAmount] = useState("");
  const router = useRouter();
  const addCreditHandler = async () => {
    const isSuccessful = await addCreditAPI(+amount);
    isSuccessful && router.refresh();
  };

  return (
    <div className={"flex gap-2"}>
      <Input
        placeholder={"amount"}
        value={amount}
        onChange={(e) => {
          if (numRegex.test(e.target.value)) {
            setAmount(e.target.value);
          }
        }}
      />
      <Button onClick={addCreditHandler} disabled={!amount}>
        Add Credit
      </Button>
    </div>
  );
};

export default AddCreditSection;
