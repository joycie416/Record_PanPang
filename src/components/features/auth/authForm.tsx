"use client";

import { supabase } from "@/utils/supabase/client";
import { getEmails, signin, signup } from "@/utils/supabase/server-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const SIGN_UP = "/sign-up";

const AuthForm = () => {
  const [emailMessage, setEmailMessage] = useState("");
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
    const emailData = await getEmails(data.email);

    if (path === SIGN_UP) {
      if (emailData.length !== 0) {
        setEmailMessage("이미 존재하는 계정입니다.");
      } else {
        await signup({
          email: data.email,
          password: data.password,
          options: { data: { nickname: data.nickname, email: data.email, profile_img: "default" } }
        });
      }
    } else {
      if (emailData.length === 0) {
        setEmailMessage("존재하지 않는 계정입니다.");
      } else {
        await signin({ email: data.email, password: data.password });
      }
    }
  };

  return (
    <div className="min-h-screen container flex justify-center items-center m-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 flex flex-col items-center m-auto">
        <input
          {...register("email")}
          placeholder="Email"
          className="auth-input w-[300px]"
          onChange={() => setEmailMessage("")}
        />
        {formState.errors.email && <span className="text-sky-300 leading-tight">{formState.errors.email.message}</span>}
        {!!emailMessage && <span className="text-sky-300 leading-tight">{emailMessage}</span>}
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
