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

  return (
    <>
      <div onClick={handleToggleLike}>
        {!isLike ? <EmptyHeart style={iconStyle} /> : <FillHeart style={iconStyle} />}
      </div>
    </>
  );
};

export default LikeButton;
