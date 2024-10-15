import { notFound } from "next/navigation";
import PostForm from "@/components/features/post/PostForm";
import { getPostById } from "@/utils/supabase/server-actions";

interface Props {
  params: { id: string };
}

const WriteIdPage = async ({ params }: Props) => {
  const post = await getPostById(params.id);

  if (!post) {
    return notFound(); // 게시글이 없으면 404 처리
  }

  const initialData = {
    youtubeUrl: post.youtube_url,
    content: post.content
  };

  return (
    <div className="container mx-auto my-16">
      <PostForm initialData={initialData} postId={params.id} />
    </div>
  );
};

export default WriteIdPage;
