"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { deletePost } from "@/utils/supabase/client-actions";
import { Post } from "@/types/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
  post: Post;
};

const PostButtons = ({ post }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  // useMutation을 사용하여 삭제 처리
  const mutation = useMutation({
    mutationFn: () => deletePost(post.post_id),
    onSuccess: () => {
      confirm("게시글이 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      router.push("/"); // 메인 페이지로 리다이렉션
    },
    onError: (error) => {
      console.error(error);
      alert("게시글 삭제에 실패했습니다.");
    }
  });

  const handleDeletePost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    mutation.mutate();
  };

  const handleGoEditPage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(`/write/${post.post_id}`);
  };

  return (
    <div className="flex items-center gap-2">
      <Button size="sm" onClick={handleGoEditPage}>
        수정
      </Button>
      <Button size="sm" variant="secondary" onClick={handleDeletePost}>
        삭제
      </Button>
    </div>
  );
};

export default PostButtons;
