"use client";

import PostCard from "@/components/commonUI/PostCard";
import { supabase } from "@/utils/supabase/client";
import { fetchUserPostsByComment } from "@/utils/supabase/server-actions";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

interface posts {
  post_id: string;
  user_id: string;
  created_at: string;
  music_id: string;
  content: string;
  youtube_url: string;
}

const MyComment = () => {
  const [userPosts, setUserPosts] = useState<posts[]>([]);
  const [user, setUser] = useState<User | null>(null);

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
      const posts = await fetchUserPostsByComment();
      setUserPosts(posts);
    };
    loadUser();
    loadUserPosts();
  }, []);

  return (
    <ul>
      {userPosts.map((post) => {
        return (
          <li key={post.post_id}>
            <PostCard post={post} user={user} />
          </li>
        );
      })}
    </ul>
  );
};

export default MyComment;
