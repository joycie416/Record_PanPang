import AuthForm from "@/components/features/auth/authForm"

type params = {
  params: {
    id: string;
  };
};

export function generateMetaData({ params }: params) {
  return { title: params.id, description: `RPP 회원가입` };
}

const SignUpPage = () => {
  return (
    <div className="bg-gray-950 min-h-screen">
      <AuthForm />
    </div>
  )
}

export default SignUpPage