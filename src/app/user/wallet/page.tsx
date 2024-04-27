import { isLoggedInServer } from "@/common/functions/authServer";
import { redirect } from "next/navigation";
import { getTransactionsHistoryAPI } from "@/app/user/wallet/api";
import dayjs from "dayjs";
import Button from "@/common/uiKit/Button";
import Input from "@/common/uiKit/Input";
import AddCreditSection from "@/app/user/wallet/components/AddCreditSection";

const WalletPage = async () => {
  if (!isLoggedInServer()) redirect("/auth/sign-in");

  const walletData = await getTransactionsHistoryAPI();

  return (
    <div className={"my-10"}>
      <div className={"w-full overflow-auto"}>
        <h1 className={"mb-5 text-2xl font-semibold"}>Transactions History</h1>
        <table
          className={
            "w-full min-w-[1000px] border-collapse [&_td]:border [&_td]:border-gray-300 [&_td]:p-2 [&_td]:text-center"
          }
        >
          <thead className={"font-semibold"}>
            <tr>
              <td>Number</td>
              <td>Comment</td>
              <td>Amount</td>
              <td>Date</td>
            </tr>
          </thead>
          <tbody>
            {walletData?.history.map((transaction, idx) => (
              <tr key={transaction.id}>
                <td>{idx + 1}</td>
                <td>{transaction.comment}</td>
                <td
                  className={
                    transaction.amount > 0 ? "text-green-500" : "text-red-500"
                  }
                >
                  {transaction.amount}
                </td>
                <td>
                  {dayjs(transaction.created_at).format(
                    "YYYY-MM-DD [at] HH:mm:ss",
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={"mt-10 flex justify-between"}>
        <p className={"text-2xl font-medium text-yellow-500"}>
          Current Credit: {walletData?.credit}
        </p>
        <AddCreditSection />
      </div>
    </div>
  );
};

export default WalletPage;
