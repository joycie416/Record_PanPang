"use client";

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
