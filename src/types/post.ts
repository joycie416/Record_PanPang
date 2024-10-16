export type Post = {
  post_id: string;
  user_id: string;
  created_at: string;
  music_id: string;
  youtube_url: string;
  content: string;
  profile: {
    nickname: string;
    profile_img: string;
  };
};
