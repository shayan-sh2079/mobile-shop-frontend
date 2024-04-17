import SignUpForm from "@/app/auth/sign-up/components/SignUpForm";

const SignUpPage = () => {
  return (
    <div className={"flex h-[calc(100vh_-_81px)] items-center justify-center"}>
      <div
        className={
          "flex w-80 flex-col items-center gap-5 rounded-md border border-gray-300 px-4 py-3"
        }
      >
        <h1 className={"text-2xl font-medium text-slate-900"}>Sign Up</h1>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUpPage;
