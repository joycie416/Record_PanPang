"use client";

import EmptyHeart from "@/app/(assets)/EmptyHeart";
import FillHeart from "@/app/(assets)/FillHeart";
import { Post } from "@/types/post";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

type Props = {
  isLike: boolean;
  iconStyle: object;
  user: User | null;
  post: Post;
};

const LikeButton = ({ isLike, iconStyle, user, post }: Props) => {
  const handleToggleLike = async () => {
    if (!!user) {
      if (isLike) {
        await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", post.post_id);
      } else if (!isLike) {
        await supabase.from("likes").insert({ post_id: post.post_id, user_id: user.id });
      }
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // 이벤트 전파 차단
    handleToggleLike(); // 좋아요 상태 처리
  };

  return (
    <>
      <button
        onClick={(e: React.MouseEvent) => {
          handleClick(e);
        }}
      >
        {!isLike ? <EmptyHeart style={iconStyle} /> : <FillHeart style={iconStyle} />}
      </button>
    </>
  );
};

export default LikeButton;
