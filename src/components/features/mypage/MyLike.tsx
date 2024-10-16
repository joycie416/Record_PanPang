"use client";

import PostCard from "@/components/commonUI/PostCard";
import useSpotifyStore from "@/store/spotifyStore";
import { Post } from "@/types/post";
import { supabase } from "@/utils/supabase/client";
import { fetchLikePosts } from "@/utils/supabase/server-actions";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const MyLike = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const { token } = useSpotifyStore();

  useEffect(() => {
    const loadUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };

    const loadUserPosts = async () => {
      const posts = await fetchLikePosts();
      setUserPosts(posts);
    };
    loadUser();
    loadUserPosts();
  }, []);

  return (
    <ul className="flex flex-col gap-6">
      {userPosts.map((post) => {
        return (
          <li key={post.post_id}>
            <PostCard post={post} user={user} token={token} />
          </li>
        );
      })}
    </ul>
  );
};

export default MyLike;
