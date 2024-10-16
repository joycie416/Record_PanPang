"use client";

import { supabase } from "@/utils/supabase/client";
import { signin, signup } from "@/utils/supabase/server-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const SIGN_UP = "/sign-up";

const AuthForm = () => {
  const path = usePathname();
  const schema =
    path === SIGN_UP
      ? z.object({
          email: z
            .string()
            .email({ message: "이메일 형식으로 입력해주세요" })
            .min(1, { message: "이메일을 입력해주세요" }),
          password: z.string().min(6, "6자 이상 입력해주세요"),
          nickname: z.string().min(1, "닉네임을 입력해주세요.").max(10, "최대 10자 입력 가능합니다.")
        })
      : z.object({
          email: z.string().min(1, "이메일을 입력해주세요"),
          password: z.string().min(1, "비밀번호를 입력해주세요")
        });

  const defaultValues =
    path === SIGN_UP
      ? {
          email: "",
          password: "",
          nickname: ""
        }
      : {
          email: "",
          password: ""
        };

  const { register, handleSubmit, formState } = useForm({
    mode: "onChange", //'onBlur' : focus가 사라졌을 때
    defaultValues,
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data: FieldValues) => {
    console.log("onSubmit :", data);

    if (path === SIGN_UP) {
      // const {
      //   data: { users },
      //   error
      // } = await supabase.auth.admin.listUsers();
      // console.log("user list :", users);

      await signup({
        email: data.email,
        password: data.password,
        options: { data: { nickname: data.nickname, email: data.email, profile_img: "default" } }
      });
    } else {
      await signin({ email: data.email, password: data.password });
    }
  };

  return (
    <div className="min-h-screen container flex justify-center items-center m-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col items-center m-auto">
        <input {...register("email")} placeholder="Email" className="auth-input w-[300px]" />
        {formState.errors.email && <span className="text-sky-300 leading-tight">{formState.errors.email.message}</span>}
        <input
          type="password"
          {...register("password", {
            // required: {
            //   value: true,
            //   message: "password required"
            // }
          })}
          placeholder="password"
          className="auth-input w-[300px] mt-4"
        />
        {formState.errors.password && (
          <span className="text-sky-300 leading-tight">{formState.errors.password.message}</span>
        )}
        {path === SIGN_UP && (
          <>
            <input
              type="text"
              {...register("nickname", {
                // required: {
                //   value: true,
                //   message: "nickname required"
                // }
              })}
              placeholder="nickname"
              className="auth-input w-[300px] mt-4"
            />
            {formState.errors.nickname && (
              <span className="text-sky-300 leading-tight">{formState.errors.nickname.message}</span>
            )}
          </>
        )}
        <button type="submit" className="w-[300px] bg-gray-300 hover:bg-gray-400 mt-4 p-2 rounded-lg">
          {path === SIGN_UP ? "회원가입" : "로그인"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
