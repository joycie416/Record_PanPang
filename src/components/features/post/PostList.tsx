import { Post } from "@/types/post";
import { User } from "@supabase/supabase-js";
import PostCard from "@/components/commonUI/PostCard";
import { fetchCurrentUser, fetchPosts } from "@/utils/supabase/server-actions";

const PostList = async () => {
  const posts: Post[] = await fetchPosts();
  const user: User | null = await fetchCurrentUser();

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.post_id}>
          <PostCard post={post} user={user} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
