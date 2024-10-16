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
