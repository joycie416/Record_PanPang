"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { addComment, deleteComment, updateComment } from "@/utils/supabase/server-actions";
import { Comment } from "@/types/comment";
import { fetchComment } from "@/utils/supabase/client-actions";
import { createClient } from "@/utils/supabase/client";

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

  //날짜
  const formatDate = (date: string) => {
    const utcDate = new Date(date);
    const kstDate = new Date(utcDate.getTime() - 9 * 60 * 60 * 1000);

    return kstDate.toLocaleString("ko-KR", {
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
    <div className="p-4 mx-auto rounded-lg shadow-md">
      <textarea
        name="newComment"
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 mb-2 border border-gray-300 resize-none focus:outline-none"
      />
      <button onClick={handleAddComment} className="py-2 mb-4 bg-sky-400 rounded hover:bg-sky-600">
        추가
      </button>
      <div className="w-100 h-64 overflow-y-auto border border-gray-300 rounded p-4">
        <ul>
          {comments.map((comment) => (
            <li key={comment.comment_id} className="flex items-start gap-4 p-4 border-b">
              <div className="flex-shrink-0">
                <Image
                  src={comment.profile?.profile_img}
                  alt={comment.profile?.nickname}
                  width={60}
                  height={60}
                  className="rounded-full border border-gray-300"
                />
              </div>
              <div className="flex-1 ">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">작성자: {comment.profile?.nickname}</span>
                  <small className="text-gray-400">{formatDate(comment.update_at)}</small>
                </div>
                <p className="mb-2">{comment.content}</p>
                {editingCommentId === comment.comment_id ? (
                  <div className="flex gap-2">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="flex-1 p-2 border border-gray-300 resize-none focus:outline-none"
                    />
                    <button
                      onClick={() => handleUpdateComment(comment.comment_id)}
                      className="py-2 px-4 bg-sky-400 hover:bg-sky-600"
                    >
                      완료
                    </button>
                    <button onClick={handleCancelEdit} className="py-2 px-4">
                      취소
                    </button>
                  </div>
                ) : (
                  userId === comment.user_id && (
                    <div className="flex gap-2 mt-2">
                      <button onClick={() => startEditing(comment.comment_id, comment.content)} className="py-2 px-4 ">
                        수정
                      </button>
                      <button onClick={() => handleDeleteComment(comment.comment_id)} className="py-2 px-4 ">
                        삭제
                      </button>
                    </div>
                  )
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommentSection;
