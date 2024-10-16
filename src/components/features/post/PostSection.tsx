"use client";

import { User } from "@supabase/supabase-js";
import PostButtons from "./PostButtons";
import { usePostById } from "@/hook/usePostById";

type Props = {
  postId: string;
  user: User | null;
};

const PostSection = ({ postId, user }: Props) => {
  const currentUserId = user?.id;
  const { data: post, isLoading, isError } = usePostById(postId);
  const PostContent: string = post?.content.split("\n").map((line: string, index: number) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  console.log(post);
  

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>게시글을 불러오는 데 문제가 발생했습니다.</div>;
  }
  if (!post) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <>
      <div>user_id: {post.user_id}</div>
      <div>post_id: {post.post_id}</div>
      <div>youtube_url: {post.youtube_url}</div>
      <div>content: {PostContent}</div>
      {currentUserId === post.user_id ? <PostButtons post={post} /> : <></>}
    </>
  );
};

export default PostSection;
