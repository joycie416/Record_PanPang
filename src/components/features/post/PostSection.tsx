"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { User } from "@supabase/supabase-js";
import PostButtons from "./PostButtons";
import { usePostById } from "@/hook/usePostById";
import DetailPlayer from "../player/DetailPlayer";
import { fetchToken } from "@/utils/spotify-client";
import LikeButton from "@/components/commonUI/LikeButton";

type Props = {
  postId: string;
  user: User | null;
};

const PostSection = ({ postId, user }: Props) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken();
      setToken(token);
    };
    getToken();
  }, []);

  // 현재 사용자 정보
  const currentUserId = user?.id;

  // 게시글 정보
  const { data: post, isLoading, isError } = usePostById(postId);

  // content 줄바꿈
  const PostContent = post?.content.split("\n").map((line: string, index: number) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>게시글을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (!post) {
    return <div>게시글이 없습니다.</div>;
  }

  const profileImgUrl = post.profiles.profile_img
    ? `https://wmkyemblcmxydwufvgay.supabase.co/storage/v1/object/public/profiles/${post.profiles.profile_img}`
    : "https://wmkyemblcmxydwufvgay.supabase.co/storage/v1/object/public/profiles/default";

  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 pb-5 mb-8 mt-10">
        <div className="flex items-center gap-3">
          <div className="w-[56px] h-[56px] border-2 border-gray-300 rounded-full overflow-hidden">
            <Image src={profileImgUrl} alt="프로필 이미지" width={56} height={56} className="object-cover" priority />
          </div>
          <div className="font-medium">{post.profiles.nickname}</div>
        </div>

        <LikeButton iconStyle={{ width: "20px", height: "20px" }} post={post} user={user} />
      </div>

      <DetailPlayer id={post.music_id} youtubeURL={post.youtube_url} token={token} />

      <div className="py-6 lg:py-12">{PostContent}</div>
      {currentUserId === post.user_id ? (
        <div className="flex justify-end mb-6">
          <PostButtons post={post} />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default PostSection;
