"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createPost } from "@/utils/supabase/client-actions";
import { CreatePostType } from "@/types/post";

const PostForm = () => {
  const router = useRouter();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    const postData: CreatePostType = {
      youtube_url: youtubeUrl,
      content
    };

    e.preventDefault();

    await createPost(postData);

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
        작성하기
      </Button>
    </form>
  );
};

export default PostForm;
