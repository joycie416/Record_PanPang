"use client";

import Image from "next/image";
import { User } from "@supabase/supabase-js";
import PostButtons from "./PostButtons";
import { usePostById } from "@/hook/usePostById";
import DetailPlayer from "../player/DetailPlayer";
import { useEffect, useState } from "react";
import { fetchToken } from "@/utils/spotify-client";
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
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-16 border-2 border-gray-300 rounded-full overflow-hidden">
            <Image
              src={profileImgUrl}
              alt="프로필 이미지"
              width={60}
              height={60}
              className="w-[60px] h-[60px] object-cover"
              priority
            />
          </div>
          <div>{post.profiles.nickname}</div>
        </div>
      </div>
      <div>youtube_url: {post.youtube_url}</div>
      <DetailPlayer id={post.music_id} youtubeURL={post.youtube_url} token={token} />
      <div>content: {PostContent}</div>
      {currentUserId === post.user_id ? <PostButtons post={post} /> : <></>}
    </>
  );
};

export default PostSection;
