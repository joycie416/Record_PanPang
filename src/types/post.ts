export type Post = {
  post_id: string;
  user_id: string;
  created_at: string;
  music_id: string;
  youtube_url: string;
  content: string;
};

export type CreatePostType = Pick<Post, "youtube_url" | "content">;
