import AuthForm from "@/components/features/auth/authForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RPP 로그인',
  description: 'RPP 로그인',
}

const page = () => {
  return (
    <div className="bg-gray-700 min-h-screen flex justify-center items-center">
      <AuthForm />
    </div>
  );
};

export default page;
