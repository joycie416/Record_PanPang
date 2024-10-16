"use client";

import { supabase } from "@/utils/supabase/client";
import { fetchSessionData, getPublicUrl } from "@/utils/supabase/client-actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProfileImg = () => {
  const defaultImg = getPublicUrl("profiles", "default");

  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["user", "client"],
    queryFn: () => fetchSessionData()
  });

  const queryClient = useQueryClient();

  supabase.auth.onAuthStateChange(() => {
    // 모든 auth state 변화에 따라 session 다시 저장
    queryClient.invalidateQueries({ queryKey: ["user", "client"] });
  });

  if (isLoading || isError) {
    return (
      <Link href={"/mypage"} className="min-w-fit min-h-fit rounded-full">
        <Image
          src={defaultImg}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="w-[40px] h-[40px] border-2 rounded-full aspect-auto object-cover"
        />
      </Link>
    );
  }

  const userImg = getPublicUrl("profiles", user?.user_metadata.profile_img);

  return (
    <Link href={"/mypage"} className="min-w-fit min-h-fit rounded-full">
      <Image
        src={userImg}
        alt="프로필 이미지"
        width={40}
        height={40}
        className="w-[40px] h-[40px] border-2 rounded-full aspect-auto object-cover"
      />
    </Link>
  );
};

export default ProfileImg;
