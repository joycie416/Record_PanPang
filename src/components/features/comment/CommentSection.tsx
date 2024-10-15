"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addComment, deleteComment, updateComment } from "@/utils/supabase/server-actions";
import { Comment } from "@/types/comment";
import { fetchComment } from "@/utils/supabase/client-actions";

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

  //날짜
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  // 댓글 작성 핸들러
  const handleAddComment = async () => {
    if (!newComment) return;

    await addComment(newComment, postId);
    setNewComment("");
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 댓글 수정 핸들러
  const handleUpdateComment = async (commentId: string) => {
    if (!editContent) return;

    await updateComment(commentId, editContent);
    setEditingCommentId(null);
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 수정 모드 시작
  const startEditing = (commentId: string, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditContent(currentContent);
  };

  // 수정 취소 핸들러
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditContent("");
  };

  return (
    <div>
      <textarea
        name="newComment"
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleAddComment}>추가</button>

      <ul>
        {comments.map((comment) => (
          <li key={comment.comment_id}>
            <div>
              <Image
                src={comment.profile?.profile_img || "/default-profile.png"}
                alt={comment.profile?.nickname}
                width={50}
                height={50}
              />
              <span>작성자: {comment.profile?.nickname}</span>
              <small>작성일: {formatDate(comment.created_at)}</small>
            </div>
            {editingCommentId === comment.comment_id ? (
              <div>
                <textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
                <button onClick={() => handleUpdateComment(comment.comment_id)}>완료</button>
                <button onClick={handleCancelEdit}>취소</button>
              </div>
            ) : (
              <>
                <p>{comment.content}</p>
                <button onClick={() => handleDeleteComment(comment.comment_id)}>삭제</button>
                <button onClick={() => startEditing(comment.comment_id, comment.content)}>수정</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
