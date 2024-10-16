import { notFound } from "next/navigation";
import { getPostById } from "@/utils/supabase/server-actions";
import PostForm from "@/components/features/post/PostForm";

interface Props {
  params: { id: string };
}

const WriteIdPage = async ({ params }: Props) => {
  const post = await getPostById(params.id);

  if (!post) {
    return notFound(); // 게시글이 없으면 404 처리
  }

  return <PostForm postId={params.id} />;
};

export default WriteIdPage;
