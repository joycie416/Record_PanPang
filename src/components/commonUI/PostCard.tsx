"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Post } from "@/types/post";
import { User } from "@supabase/supabase-js";
import { Button } from "../ui/button";
import { deletePost } from "@/utils/supabase/client-actions";

type Props = {
  post: Post;
  user: User | null;
};

const PostCard = ({ post, user }: Props) => {
  const currentUserId = user?.id;

  const handleDelete = async () => {
    try {
      await deletePost(post.post_id);
      alert("게시글이 삭제되었습니다.");
    } catch (error) {
      let message;
      if (error instanceof Error) message = error.message;
      else message = String(error); // 아닐 경우, 오류를 문자열로 변환

      console.error(message);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          <div>{post.user_id}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div>{post.content}</div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div>2</div>
            </div>
            <div className="flex items-center gap-2">
              <div>2</div>
            </div>
          </div>
          {currentUserId === post.user_id ? (
            <div className="flex items-center gap-2">
              <Button size="sm">수정</Button>
              <Button size="sm" variant="secondary" onClick={handleDelete}>
                삭제
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
