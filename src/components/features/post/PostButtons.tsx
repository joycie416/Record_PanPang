"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/utils/supabase/client-actions";
import { Post } from "@/types/post";

type Props = {
  post: Post;
};

const PostButtons = ({ post }: Props) => {
  const router = useRouter();

  const handleDeletePost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      await deletePost(post.post_id);
      alert("게시글이 삭제되었습니다.");
      router.replace("/");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error); // 아닐 경우, 오류를 문자열로 변환

      console.error(message);
      alert("게시글 삭제에 실패했습니다.");
      router.replace("/");
    }
  };

  const handleUpdatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.replace(`/write/${post.post_id}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={handleUpdatePost}>
        수정
      </Button>
      <Button size="sm" variant="secondary" onClick={handleDeletePost}>
        삭제
      </Button>
    </div>
  );
};

export default PostButtons;
