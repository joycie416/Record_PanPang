"use client";

import { Comment } from "@/types/comment";
import { addComment, deleteComment, fetchComment, updateComment } from "@/utils/supabase/actions";
import React, { useEffect, useState } from "react";

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");

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
  const handleUpdateComment = async (commentId: string) => {
    if (!editContent) return;
    await updateComment(commentId, editContent);
    setEditingCommentId(null);
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 수정 모드
  const startEditing = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  return (
    <div>
      <textarea name="newComment" placeholder="댓글을 입력하세요" onChange={(e) => setNewComment(e.target.value)} />;
      <button onClick={handleAddComment}>추가</button>
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id}>
              {editingCommentId === comment.comment_id ? (
                <div>
                  <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                  <button onClick={() => handleUpdateComment(comment.comment_id)}>완료</button>
                  <button onClick={handleCancelEdit}>취소</button>
                </div>
              ) : (
                <span onClick={() => startEditing(comment.comment_id, comment.content)} style={{ cursor: "pointer" }}>
                  수정
                </span>
              )}
              <button onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
              <p>{comment.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CommentSection;
