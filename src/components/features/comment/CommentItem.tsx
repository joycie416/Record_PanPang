import React from "react";
import Image from "next/image";
import { CommentItemProps } from "@/types/comment";
import { Button } from "@/components/ui/button";

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  userId,
  handleDeleteComment,
  startEditing,
  editingCommentId,
  editContent,
  setEditContent,
  handleUpdateComment,
  handleCancelEdit
}) => {
  const formatDate = (date: string) => {
    const utcDate = new Date(date);
    return utcDate.toLocaleString("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const lineBreaks = (content: string) => {
    return content.split("\n").map((line, idx) => (
      <span key={`${comment.comment_id}_line_${idx}`}>
        {line}
        <br />
      </span>
    ));
  };

  return (
    <li className="flex items-start gap-4 p-4 border-b">
      <div className="flex-shrink-0">
        <Image
          src={comment.profile?.profile_img || "/default-profile.png"}
          alt={comment.profile?.nickname || "익명"}
          width={60}
          height={60}
          style={{
            maxWidth: 200,
            width: "full",
            aspectRatio: "1/1",
            objectFit: "cover"
          }}
          priority
          className="border-2 border-gray-300 rounded-full"
        />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="font-semibold">작성자: {comment.profile?.nickname}</span>
          <small className="text-gray-400">{formatDate(comment.update_at)}</small>
        </div>
        <p className="mb-2">{lineBreaks(comment.content)}</p>
        {editingCommentId === comment.comment_id ? (
          <div className="flex gap-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="flex-1 p-2 border border-gray-300 resize-none focus:outline-none"
            />
            <Button
              size="sm"
              onClick={() => handleUpdateComment(comment.comment_id)}
              className="py-2 px-4 bg-sky-400 hover:bg-sky-600"
            >
              완료
            </Button>
            <Button size="sm" variant="secondary" className="py-2 px-4" onClick={handleCancelEdit}>
              취소
            </Button>
          </div>
        ) : (
          userId === comment.user_id && (
            <div className="flex gap-2 mt-2">
              <Button
                size="sm"
                onClick={() => startEditing(comment.comment_id, comment.content)}
                className="py-2 px-4 "
              >
                수정
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => handleDeleteComment(comment.comment_id)}
                className="py-2 px-4"
              >
                삭제
              </Button>
            </div>
          )
        )}
      </div>
    </li>
  );
};

export default CommentItem;
