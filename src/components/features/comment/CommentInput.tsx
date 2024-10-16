import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommentInputProps } from "@/types/comment";
import React from "react";

const CommentInput = ({ newComment, setNewComment, handleAddComment }: CommentInputProps) => {
  return (
    <div className="flex gap-4 mb-6">
      <Textarea
        name="newComment"
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-fullh-[60px] border-gray-300 resize-none focus:outline-none"
      />
      <Button onClick={handleAddComment} className="h-[60px] py-2">
        추가
      </Button>
    </div>
  );
};

export default CommentInput;
