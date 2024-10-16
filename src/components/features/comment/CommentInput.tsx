import { Button } from "@/components/ui/button";
import { CommentInputProps } from "@/types/comment";
import React from "react";

const CommentInput = ({ newComment, setNewComment, handleAddComment }: CommentInputProps) => {
  return (
    <div className="mb-4">
      <textarea
        name="newComment"
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 resize-none focus:outline-none"
      />
      <Button onClick={handleAddComment} className="py-2">
        추가
      </Button>
    </div>
  );
};

export default CommentInput;
