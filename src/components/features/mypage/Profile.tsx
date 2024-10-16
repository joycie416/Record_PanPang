"use client";

import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import EditProfileButton from "./EditProfileButton";
import { useQuery } from "@tanstack/react-query";
import ProfileLoading from "./ProfileLoading";
import ProfileError from "./ProfileError";
import { fetchSessionData } from "@/utils/supabase/client-actions";

const STORAGE = "profiles";

const Profile = () => {
  const {
    data: user,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["user", "client"],
    queryFn: () => fetchSessionData()
  });

  if (isLoading) {
    return <ProfileLoading />;
  }

  if (isError) {
    return <ProfileError />;
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from(STORAGE).getPublicUrl(user?.user_metadata?.profile_img ?? "default");

  return (
    <div className="w-full flex">
      <div className="flex items-center">
        <div className="w-[160px] h-[160px] box-decoration-clone">
          <Image
            src={publicUrl}
            alt={"프로필 이미지"}
            width={160}
            height={160}
            style={{
              maxWidth: 200,
              width: "full",
              aspectRatio: "1/1",
              objectFit: "cover"
            }}
            priority
            className="border-2 border-gray-300 rounded-full"
          />
        </div>
        <div className="flex gap-1 font-medium">
          <span className="ml-6">{user?.user_metadata?.nickname}</span> / <span>{user?.email}</span>
        </div>
      </div>
      <div className="w-full"></div>
      <div className="w-full flex justify-end items-start">
        <EditProfileButton user={user} />
      </div>
    </div>
  );
};

export default Profile;
