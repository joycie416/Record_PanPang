import { createClient } from "@/utils/supabase/server";
import { Post } from "@/types/post";
import PostCard from "@/components/commonUI/PostCard";

// 게시글 조회
export async function fetchPosts() {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }

  return data;
}

const PostList = async () => {
  const posts: Post[] = await fetchPosts();

  return (
    <ul className="flex flex-col gap-6">
      {posts.map((post) => (
        <li key={post.post_id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
};

export default PostList;
