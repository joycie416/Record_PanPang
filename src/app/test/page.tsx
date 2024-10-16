import { UUID } from "crypto";
import Player from "@/components/features/player/Player";
import DetailPlayer from "@/components/features/player/DetailPlayer";
import { createClient } from "@/utils/supabase/server";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;

type postType = {
  post_id: UUID;
  user_id: UUID;
  created_at: Date;
  music_id: string;
  content: string;
  youtube_url: string;
};

const page = async () => {
  const supabase = createClient();
  // 스포티파이 api 요청을 위한 토큰 받아오는 함수
  const getSpotifyToken = async () => {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
      client_id: SPOTIFY_CLIENT_ID,
      client_secret: SPOTIFY_CLIENT_SECRET
    });

    // fetch 부분
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: params.toString()
    });

    // 토큰만 구조분해 할당으로 받아옴
    const { access_token: token } = await res.json();
    return token;
  };

  // 변수에 저장
  const token = await getSpotifyToken();

  // supabase에서 게시글 받아오기, 에러 없을 때만 플레이어 컴포넌트 불러오기
  const { data, error } = await supabase.from("posts").select("*").neq("music_id", "");
  if (!error) {
    const posts = data as postType[];

    return (
      <div>
        {posts.map((post) => (
          <div key={post.post_id}>
            <Player id={post.music_id} token={token} youtubeURL={post.youtube_url} />
            <DetailPlayer id={post.music_id} token={token} youtubeURL={post.youtube_url} />
          </div>
        ))}
      </div>
    );
  }
};

export default page;
