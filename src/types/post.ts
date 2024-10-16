export interface Post {
  post_id: string;
  user_id: string;
  profiles: {
    nickname: string;
    profile_img: string;
  };
  created_at: string;
  music_id: string;
  youtube_url: string;
  content: string;
  keyword: string;
}
