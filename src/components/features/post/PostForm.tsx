"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost, updatePost } from "@/utils/supabase/client-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Post } from "@/types/post";
import { usePostById } from "@/hook/usePostById";

type Props = {
  postId?: string;
};

const PostForm = ({ postId }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data: post } = usePostById(postId ? postId : "");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [content, setContent] = useState("");

  // 수정 시 초기 데이터를 세팅하는 useEffect 추가
  useEffect(() => {
    if (post) {
      setYoutubeUrl(post.youtube_url);
      setContent(post.content);
    }
  }, [post]);

  // useMutation을 사용하여 포스트 생성 및 업데이트 처리
  const mutation = useMutation({
    mutationFn: (postData: Partial<Post>) => {
      return postId ? updatePost(postId, postData) : createPost(postData);
    },
    onSuccess: () => {
      // 성공 시 입력값 초기화
      if (!postId) {
        setYoutubeUrl("");
        setContent("");
      }

      if (postId) {
        alert("게시글이 수정되었습니다.");
        queryClient.invalidateQueries({ queryKey: ["post", postId] });
        router.push(`/detail/${postId}`);
      } else {
        queryClient.invalidateQueries({ queryKey: ["posts"] });
        router.push("/");
      }
    },
    onError: (error) => {
      console.error(error);
      alert("게시글 처리에 실패했습니다.");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    queryClient.invalidateQueries({ queryKey: ["posts"] });

    const postData = { youtube_url: youtubeUrl, content };
    await mutation.mutateAsync(postData);
  };

  return (
    <form onSubmit={handleSubmit} className=" flex flex-col gap-5">
      <Input
        placeholder="선택한 노래의 유튜브 URL을 추가해주세요 *"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      <div className="flex flex-col gap-5 items-center">
        <Textarea
          className="h-32 resize-none"
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button size="lg" className="w-24">
          {postId ? "수정하기" : "작성하기"}
        </Button>
      </div>
    </form>
  );
};

export default PostForm;
