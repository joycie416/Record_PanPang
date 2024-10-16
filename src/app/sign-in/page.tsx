import AuthForm from "@/components/features/auth/authForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RPP 로그인",
  description: "RPP 로그인"
};

const page = () => {
  return <AuthForm />;
};

export default page;
