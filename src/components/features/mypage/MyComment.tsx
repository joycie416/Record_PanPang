"use client";

import PostCard from "@/components/commonUI/PostCard";
import { Post } from "@/types/post";
import { supabase } from "@/utils/supabase/client";
import { fetchUserPostsByComment } from "@/utils/supabase/server-actions";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";

const MyComment = () => {
  const [userPosts, setUserPosts] = useState<Post[]>([]);
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
    <div>
      {userPosts.map((post) => {
        return (
          <li key={post.post_id}>
            <PostCard post={post} user={user} />
          </li>
        );
      })}
    </div>
  );
};

export default MyComment;
