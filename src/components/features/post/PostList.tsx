import { createBrowserClient } from "@/utils/supabase/client2";
import { Post } from "@/types/post";
import PostCard from "@/components/commonUI/PostCard";

// 게시글 조회
export async function fetchPosts() {
  const supabase = createBrowserClient();
  const { data, error } = await supabase.from("posts").select("*");

  if (error) {
    console.error(error);
    return []; // 에러 발생 시 빈 배열 반환
  }

    // 실시간 데이터 구독
    supabase
      .channel("public:posts")
      .on("postgres_changes", { event: "*", schema: "public", table: "posts" }, (payload) => {
        console.log("변경사항이 감지되었습니다: ", payload);
        // 여기에서 변경된 데이터를 처리합니다. 예: 상태 업데이트 등
      })
      .subscribe();

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
