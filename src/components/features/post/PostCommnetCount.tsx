"use client";

import CommentCon from "@/app/(assets)/CommentCon";
import { Post } from "@/types/post";
import { fetchPostCommentCount } from "@/utils/supabase/client-actions";
import { useEffect, useState } from "react";

const PostCommnetCount = ({ post }: { post: Post }) => {
  const [commnetCount, setCommentCount] = useState<number | undefined>(0);

  useEffect(() => {
    const getCommentCount = async () => {
      const count = await fetchPostCommentCount(post.post_id);
      setCommentCount(count);
    };

    getCommentCount();
  }, [post.post_id]);

  return (
    <div className="flex items-center gap-2">
      <CommentCon style={{ width: "17px", cursor: "pointer", padding: "1px" }} />
      <p>{commnetCount}</p>
    </div>
  );
};

export default PostCommnetCount;
