"use client";

import { User } from "@supabase/supabase-js";
import { usePosts } from "@/hook/usePosts";
import PostCard from "@/components/commonUI/PostCard";
import { useEffect } from "react";
import useSpotifyStore from "@/store/spotifyStore";
import { fetchToken } from "@/utils/spotify-client";

type Props = {
  user: User | null;
};

const PostList = ({ user }: Props) => {
  const { setToken, token } = useSpotifyStore();

  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken();
      setToken(token);
    };
    getToken();
  }, [setToken]);

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
