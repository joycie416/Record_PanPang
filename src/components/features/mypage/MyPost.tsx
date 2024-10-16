"use client";

import { User } from "@supabase/supabase-js";
import PostCard from "@/components/commonUI/PostCard";
import { usePostByUserId } from "@/hook/usePostByUserId";
import useSpotifyStore from "@/store/spotifyStore";

type Props = {
  user: User | null;
};

const MyPost = ({ user }: Props) => {
  const { token } = useSpotifyStore();
  // 현재 사용자 정보
  const currentUserId = user?.id;
  const { data: posts, isLoading, isError } = usePostByUserId(currentUserId ?? "");

  if (!currentUserId) {
    return <div>사용자 정보가 없습니다. 로그인이 필요합니다.</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>게시글을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (!posts || posts.length === 0) {
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

export default MyPost;
