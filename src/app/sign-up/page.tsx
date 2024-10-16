import AuthForm from "@/components/features/auth/authForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RPP 회원가입",
  description: "RPP 회원가입"
};

const SignUpPage = () => {
  return <AuthForm />;
};

export default SignUpPage;
