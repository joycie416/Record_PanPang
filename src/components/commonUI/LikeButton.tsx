"use client";

import React from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { supabase } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Post } from "@/types/post";
import EmptyHeart from "@/app/(assets)/EmptyHeart";
import FillHeart from "@/app/(assets)/FillHeart";

type Props = {
  iconStyle: object;
  user: User | null;
  post: Post;
};

type Like = {
  id: string;
  user_id: string;
  post_id: string;
};

const LikeButton = ({ iconStyle, user, post }: Props) => {
  const queryClient = useQueryClient();

  // 좋아요 목록을 가져오는 쿼리
  const { data: likes } = useQuery<Like[]>({
    queryKey: ["likes", post.post_id],
    queryFn: async () => {
      const { data } = await supabase.from("likes").select("*").eq("post_id", post.post_id);
      return data || [];
    }
  });

  // 현재 사용자가 좋아요 했는지 안했는지 확인
  const isLike = likes?.some((like) => like.user_id === user?.id) || false;

  const toggleLike = async () => {
    if (!user) {
      throw new Error("유저를 찾을 수 없습니다.");
    }

    if (isLike) {
      await supabase.from("likes").delete().eq("user_id", user.id).eq("post_id", post.post_id);
    } else {
      await supabase.from("likes").insert({ post_id: post.post_id, user_id: user.id });
    }
  };

  const toggleLikeMutation = useMutation({
    mutationFn: () => toggleLike(),

    // 낙관적 업데이트 실행되는 부분
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["likes", post.post_id] });
      const prevLikes = queryClient.getQueryData<Like[]>(["likes", post.post_id]);

      queryClient.setQueryData<Like[]>(["likes", post.post_id], (old) => {
        if (!old) return old;
        if (isLike) {
          return old.filter((like) => like.user_id !== user?.id);
        } else {
          return [...old, { id: "temp", user_id: user!.id, post_id: post.post_id }];
        }
      });

      return { prevLikes };
    },
    onError: (err, variables, context) => {
      if (context?.prevLikes) {
        queryClient.setQueryData(["likes", post.post_id], context.prevLikes);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", post.post_id] });
    }
  });

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      console.log("확인");
      alert("로그인한 사용자만 이용할 수 있습니다.");
    } else if (user) {
      toggleLikeMutation.mutate();
    }
  };

  return (
    <div className="flex gap-x-2">
      <button onClick={handleClick} disabled={toggleLikeMutation.isPending}>
        {isLike ? <FillHeart style={iconStyle} /> : <EmptyHeart style={iconStyle} />}
      </button>
      <p>{likes?.length || 0}</p>
    </div>
  );
};

export default LikeButton;
