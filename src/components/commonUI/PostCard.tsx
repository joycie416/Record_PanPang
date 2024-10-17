"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/post";
import { User } from "@supabase/supabase-js";
import LikeButton from "./LikeButton";
import PostButtons from "../features/post/PostButtons";
import Player from "../features/player/Player";
import PostCommnetCount from "../features/post/PostCommnetCount";

type Props = {
  post: Post;
  user: User | null;
  token: string;
};

const PostCard = ({ post, user, token }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const currentUserId = user?.id;

  // content 줄바꿈
  const PostContent = post.content.split("\n").map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  // 프로필 이미지
  const profileImgUrl = post.profiles.profile_img
    ? `https://wmkyemblcmxydwufvgay.supabase.co/storage/v1/object/public/profiles/${post.profiles.profile_img}`
    : "https://wmkyemblcmxydwufvgay.supabase.co/storage/v1/object/public/profiles/default";

  const handleLinkPost = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (!!currentUserId) {
      queryClient.invalidateQueries({ queryKey: ["post", post.post_id] });
      router.push(`/detail/${post.post_id}`);
    } else {
      const isConfirm = confirm("로그인 하시겠습니까?");
      if (isConfirm) {
        router.push("/sign-in");
      }
    }
  };

  return (
    <Card className="cursor-pointer" onClick={handleLinkPost}>
      <CardHeader className="pl-6 pr-20 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-[44px] h-[44px] border-2 border-gray-300 rounded-full overflow-hidden">
            <Image
              src={profileImgUrl}
              alt="프로필 이미지"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <div className="font-semibold text-gray-700">{post.profiles.nickname}</div>
        </div>
      </CardHeader>
      <CardContent className="pr-6 md:px-20 pb-6 pt-0">
        <Player id={post.music_id} youtubeURL={post.youtube_url} token={token} />
        <div className="text-ellipsis-3">{PostContent}</div>
      </CardContent>
      <CardFooter className="pr-6 md:px-20 pb-6 pt-0">
        <div className="w-full flex items-center justify-between gap-6 pt-6 border-t border-gray-300">
          <div className="flex items-center gap-6">
            <PostCommnetCount post={post} />
            <LikeButton iconStyle={{ width: "17px", cursor: "pointer", padding: "1px" }} user={user} post={post} />
          </div>
          {currentUserId === post.user_id ? <PostButtons post={post} /> : <></>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
