import CommentSection from "@/components/features/comment/CommentSection";
import React from "react";

const Detailpage = ({ params }: { params: { id: string } }) => {
  const postId = "test-post-id";

  return (
    <div>
      <CommentSection postId="test-post-id" />
    </div>
  );
};

export default Detailpage;
