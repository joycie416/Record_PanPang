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
      <CardHeader>
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
      </CardHeader>
      <CardContent>
        <div>
          <Player id={post.music_id} youtubeURL={post.youtube_url} token={token} />
        </div>
        <div>{PostContent}</div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div>2</div>
            </div>
            <div className="flex items-center gap-2">
              <LikeButton iconStyle={{ width: "17px", cursor: "pointer", padding: "1px" }} user={user} post={post} />
            </div>
          </div>
          {currentUserId === post.user_id ? <PostButtons post={post} /> : <></>}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
