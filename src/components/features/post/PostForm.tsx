"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost, updatePost } from "@/utils/supabase/client-actions";

type Props = {
  initialData?: {
    youtubeUrl: string;
    content: string;
  };
  postId?: string;
};

const PostForm = ({ initialData, postId }: Props) => {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtubeUrl || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const postData = { youtube_url: youtubeUrl, content };

    if (postId) {
      // 게시글 수정
      await updatePost(postId, postData);
    } else {
      // 게시글 추가
      await createPost(postData);
    }

    // 입력값 초기화
    setYoutubeUrl("");
    setContent("");

    router.replace("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="text" placeholder="음악검색" />
        <Button size="lg">검색</Button>
      </div>
      <Input
        placeholder="선택한 노래의 유튜브 URL을 추가해주세요 *"
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
      />
      <Textarea placeholder="내용을 입력해주세요" value={content} onChange={(e) => setContent(e.target.value)} />
      <Button size="lg" type="submit">
        {postId ? "수정하기" : "작성하기"}
      </Button>
    </form>
  );
};

export default PostForm;
