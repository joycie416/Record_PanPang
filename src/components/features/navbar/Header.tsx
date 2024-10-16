import Link from "next/link";
import React from "react";
import SignOutButton from "../auth/signOutButton";
import ProfileImg from "./ProfileImg";
import { fetchCurrentUser } from "@/utils/supabase/server-actions";

const Header = async () => {
  const user = await fetchCurrentUser();
  return (
    <header className={`bg-gray-700 text-gray-300 h-[56px] sticky top-0 left-0 right-0`}>
      <div className="container h-full flex justify-between items-center py-2 px-4 mx-auto">
        <Link href={"/"}>Home</Link>
        <ul className="flex gap-4 items-center">
          {!user ? (
            <>
              <li>
                <Link href={"/sign-in"}>로그인</Link>
              </li>
              <li>
                <Link href={"/sign-up"}>회원가입</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <SignOutButton />
              </li>
              <li className="flex gap-4 items-center">
                <Link href={"/mypage"}>
                  <p>Profile</p>
                </Link>
                <ProfileImg />
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
