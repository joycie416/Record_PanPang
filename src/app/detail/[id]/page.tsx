import { notFound } from "next/navigation";
import { getPostById } from "@/utils/supabase/server-actions";
import PostButtons from "@/components/features/post/PostButtons";

interface Props {
  params: { id: string };
}

const DetailIdPage = async ({ params }: Props) => {
  const post = await getPostById(params.id);

  if (!post) {
    return notFound(); // 게시글이 없으면 404 처리
  }

  return (
    <div className="container mx-auto my-16">
      <div>user_id: {post.user_id}</div>
      <div>post_id: {post.post_id}</div>
      <div>youtube_url: {post.youtube_url}</div>
      <div>content: {post.content}</div>
      <PostButtons post={post} />
    </div>
  );
};

export default DetailIdPage;
