import CommentSection from "@/components/features/comment/CommentSection";

const DetailPage = () => {
  const postId = "2130dce3-e645-4094-9601-99b90bd46c6b";
  return (
    <div>
      <h1>댓글 테스트 페이지</h1>
      <CommentSection postId={postId} />
    </div>
  );
};

export default DetailPage;
