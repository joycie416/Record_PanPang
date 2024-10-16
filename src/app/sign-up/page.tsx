import AuthForm from "@/components/features/auth/authForm"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'RPP 회원가입',
  description: 'RPP 회원가입',
}

const SignUpPage = () => {
  return (
    <div className="bg-gray-700 min-h-screen">
      <AuthForm />
    </div>
  )
}

export default SignUpPage