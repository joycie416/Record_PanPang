import { Comment } from "@/types/comment";
import { addComment, deleteComment, fetchComment, updateComment } from "@/utils/supabase/actions";
import React, { useEffect, useState } from "react";

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function loadComments() {
      const fetchedComments = await fetchComment(postId);
      setComments(fetchedComments);
    }
    loadComments();
  }, [postId]);

  // 댓글 작성 핸들
  const handleAddComment = async () => {
    if (!newComment) return;

    await addComment(newComment, postId);
    setNewComment("");
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 댓글 삭제 핸들
  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    const updateComments = await fetchComment(postId);
    setComments(updateComments);
  };

  // 댓글 수정
  const handleUpdateComment = async (commentId: string, content: string) => {
    await updateComment(commentId, content);
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  return (
    <div>
      <textarea name="newComment" placeholder="댓글을 입력하세요" onChange={(e) => setNewComment(e.target.value)} />;
      <button onClick={handleAddComment}>추가</button>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <p>{comment.content}</p>
              <button onClick={() => handleUpdateComment(comment.comment_id, "새로운 내용")}> 수정</button>
              <button onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentSection;
