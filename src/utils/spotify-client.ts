"use client";

import { OriginalTrack } from "@/types/track";
import { formatTrackData } from "./formatTrackData";

export const fetchToken = async () => {
  const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
  const clientPW = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    cache: "no-store",
    body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientPW}`
  });
  if (!res.ok) {
    throw new Error("Failed to fetch token");
  }
  const data = await res.json();

  const { access_token: token } = data;
  return token;
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
