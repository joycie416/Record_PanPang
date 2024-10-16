"use client";

import React, { useEffect, useState } from "react";
import { addComment, deleteComment, updateComment } from "@/utils/supabase/client-actions";
import { Comment } from "@/types/comment";
import { fetchComment } from "@/utils/supabase/client-actions";
import { createClient } from "@/utils/supabase/client";
import CommentInput from "./CommentInput";
import CommentList from "./CommentList";

const supabase = createClient();

const CommentSection = ({ postId }: { postId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function loadComments() {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (user) setUserId(user.id);

      const fetchedComments = await fetchComment(postId);
      setComments(fetchedComments);
    }
    loadComments();
  }, [postId]);

  // 댓글 업데이트 후 목록 다시 불러오기
  const refreshComments = async () => {
    const updatedComments = await fetchComment(postId);
    setComments(updatedComments);
  };

  // 댓글 작성 핸들러
  const handleAddComment = async () => {
    if (!newComment) return;

    await addComment(newComment, postId);
    setNewComment("");
    await refreshComments();
  };

  // 댓글 삭제 핸들러
  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId);
    await refreshComments();
  };

  // 댓글 수정 핸들러
  const handleUpdateComment = async (commentId: string) => {
    if (!editContent) return;

    await updateComment(commentId, editContent);
    setEditingCommentId(null);
    await refreshComments();
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
    <div className="p-4 mx-auto rounded-lg shadow-md">
      <CommentInput newComment={newComment} setNewComment={setNewComment} handleAddComment={handleAddComment} />
      <CommentList
        comments={comments}
        userId={userId}
        handleDeleteComment={handleDeleteComment}
        startEditing={startEditing}
        editingCommentId={editingCommentId}
        editContent={editContent}
        setEditContent={setEditContent}
        handleUpdateComment={handleUpdateComment}
        handleCancelEdit={handleCancelEdit}
      />
    </div>
  );
};

export default CommentSection;
