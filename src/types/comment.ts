export interface Profile {
  nickname: string;
  profile_img: string;
}

export interface Comment {
  comment_id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: Profile;
}
