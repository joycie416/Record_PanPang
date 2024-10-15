import { OriginalTrack } from "@/types/track";
import { formatTrackData } from "./formatTrackData";

// 스포티파이 api 요청을 위한 토큰 받아오는 함수
export const getSpotifyToken = async () => {
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: process.env.SPOTIFY_CLIENT_ID as string,
    client_secret: process.env.SPOTIFY_CLIENT_SECRET as string
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
  return token as string;
};

export const getSpotifyTrack = async (id: string, token: string) => {
  // 스포티파이에 해당 음악 정보 요청
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token
    }
  });
  const data: OriginalTrack = await res.json();

  // 포맷팅 함수로 필요한 데이터만 받아옴
  const music = formatTrackData(data);
  return music;
};
