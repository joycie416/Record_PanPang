"use client";

import { User } from "@supabase/supabase-js";
import { usePosts } from "@/hook/usePosts";
import PostCard from "@/components/commonUI/PostCard";

type Props = {
  user: User | null;
  token: string;
};

const PostList = ({ user, token }: Props) => {
  const { data: posts, isLoading, isError } = usePosts();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>게시글을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (!posts) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.post_id}>
          <PostCard post={post} user={user} token={token} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
