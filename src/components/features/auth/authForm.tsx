"use client";

import { signin, signup } from "@/utils/supabase/server-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";

const SIGN_UP = "/sign-up"

const AuthForm = () => {
  const path = usePathname();
  const schema =
    path === SIGN_UP
      ? z.object({
          email: z.string().email({ message: "Invalid email" }).min(1, { message: "Email is required" }),
          password: z.string().min(1, "Password is required"),
          nickname: z.string().min(1, "Nickname is required")
        })
      : z.object({
          email: z.string().min(1, "Email is required"),
          password: z.string().min(1, "Password is required")
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

  const onSubmit = (data: FieldValues) => {
    console.log("onSubmit :", data);
    if (path === SIGN_UP) {
      signup({
        email: data.email,
        password: data.password,
        options: { data: { nickname: data.nickname, profile_img: "default" } }
      });
    } else {
      signin({ email: data.email, password: data.password });
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
