export interface Comment {
  comment_id: string;
  user_id: string;
  post_id?: string;
  content: string;
  update_at: string;
  created_at?: string;
  profile?: {
    profile_img: string;
    nickname: string;
  };
}

export interface CommentInputProps {
  newComment: string;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleAddComment: () => void;
}

export interface CommentListProps {
  comments: Comment[];
  userId: string | null;
  handleDeleteComment: (commentId: string) => void;
  startEditing: (commentId: string, currentContent: string) => void;
  editingCommentId: string | null;
  editContent: string;
  setEditContent: (value: string) => void;
  handleUpdateComment: (commentId: string) => void;
  handleCancelEdit: () => void;
}

export interface CommentItemProps {
  comment: Comment;
  userId: string | null;
  handleDeleteComment: (commentId: string) => void;
  startEditing: (commentId: string, currentContent: string) => void;
  editingCommentId: string | null;
  editContent: string;
  setEditContent: (value: string) => void;
  handleUpdateComment: (commentId: string) => void;
  handleCancelEdit: () => void;
}
