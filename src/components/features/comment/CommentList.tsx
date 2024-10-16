import React from "react";
import { CommentListProps } from "@/types/comment";
import CommentItem from "./CommentItem";

const CommentList: React.FC<CommentListProps> = ({
  comments,
  userId,
  handleDeleteComment,
  startEditing,
  editingCommentId,
  editContent,
  setEditContent,
  handleUpdateComment,
  handleCancelEdit
}) => {
  return (
    <div className="w-100 h-64 overflow-y-auto border border-gray-300 rounded p-4">
      <ul>
        {comments.map((comment) => (
          <CommentItem
            key={comment.comment_id}
            comment={comment}
            userId={userId}
            handleDeleteComment={handleDeleteComment}
            startEditing={startEditing}
            editingCommentId={editingCommentId}
            editContent={editContent}
            setEditContent={setEditContent}
            handleUpdateComment={handleUpdateComment}
            handleCancelEdit={handleCancelEdit}
          />
        ))}
      </ul>
    </div>
  );
};

export default CommentList;
