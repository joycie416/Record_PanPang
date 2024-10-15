import { Post } from "@/types/post";
import { User } from "@supabase/supabase-js";
import PostCard from "@/components/commonUI/PostCard";
import { fetchCurrentUser, fetchLikePosts, fetchPosts } from "@/utils/supabase/server-actions";
import { getSpotifyToken } from "@/utils/spotify-actions";

const PostList = async () => {
  const posts: Post[] = await fetchPosts();
  const user: User | null = await fetchCurrentUser();
  const likePosts: string[] | null = await fetchLikePosts(user?.id as string);
  const token: string = await getSpotifyToken();

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.post_id}>
          <PostCard post={post} user={user} likePosts={likePosts} token={token} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
